import { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useNavigate, useLoaderData, useSubmit } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Log, Task } from "../../types/DB";
import TaskAccordion from "./TaskAccordion";
import StatusEntryDialog from "../Tasks/StatusEntryDialog";
import { SubmitTarget } from "react-router-dom/dist/dom";
import sortLogs from "../../vars/sortLogs";
import sortTasks from "../../vars/sortTasks";
import IndexLog from "./IndexLog";
import { getLast12Months, today } from "../../vars/dateObjects";
import ArchiveConfirmDialog from "./ArchiveConfirmDialog";

const IndexPage = () => {
    const { currentUser } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [archivedTask, setArchivedTask] = useState<string>('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = today;
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    });



    const navigate = useNavigate();
    const submit = useSubmit();

    // Loader data: { tasks, logs }
    const { tasks, logs } = useLoaderData() as {
        tasks: Task[];
        logs: Log[];
    };

    // Redirect if not logged in
    useEffect(() => {
        if (!currentUser) navigate("/login");
    }, [currentUser, navigate]);

    if (!currentUser) return null; // prevent flash

    const months = getLast12Months();

    function handleMonthChange(e: SelectChangeEvent<string>) {
        const month = e.target.value;
        setSelectedMonth(month);

        // Navigate to same page but with ?month=yyyy-mm
        navigate(`/?month=${month}`);
    }

    const sortedTasks = sortTasks(tasks);

    const sortedLogs = sortLogs(logs);

    function onNewEntry(task: Task) {
        setEditedTask(task.id || '');
        setModalOpen(true);
    }

    function onArchive(id: string | undefined) {
        if (!id) return;
        setArchivedTask(id);
        setConfirmOpen(true);
    }

    function handleArchiveTask(id: string) {
        if (!id) return;
        setConfirmOpen(false);
        submit({ id, archived: 1 }, { method: 'POST', encType: 'application/json' });
        setArchivedTask('');
    }

    function handleSend(data: { entry: string }) {
        const update = {
            author: currentUser?.displayName,
            entry: data.entry,
            id: editedTask
        }

        submit(update as SubmitTarget, { method: 'POST', encType: 'application/json', });
        setModalOpen(false);
        setEditedTask('');
    }

    return (
        <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
            <StatusEntryDialog open={modalOpen} setOpen={setModalOpen} handleSend={handleSend as (data: object) => void} />
            <ArchiveConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} handleConfirm={handleArchiveTask} id={archivedTask} />
            {/* Welcome */}
            <Typography variant="h4" fontWeight={700} sx={{ mb: 3, textAlign: "center" }}>
                Welcome, {currentUser.displayName}
            </Typography>

            {/* TASKS SECTION */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                    mb: 2
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    My tasks
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/tasks/add", { state: { redirectTo: '/' } })}
                >
                    New Task
                </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sortedTasks.map((task) => (
                    <TaskAccordion
                        key={task.id}
                        task={task}
                        onNewEntry={onNewEntry}
                        onArchive={onArchive}
                    />
                ))}

                {sortedTasks.length === 0 && (
                    <Typography color="text.secondary">No tasks available.</Typography>
                )}
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/tasks")}
                >
                    All tasks
                </Button>
            </Box>

            {/* LOGS SECTION */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 5,
                    mb: 2
                }}
            >
                <Typography variant="h5" fontWeight={600}>
                    My logs
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/logs/add", { state: { redirectTo: '/' } })}
                >
                    New Log
                </Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mb: 2,
                    mt: 1
                }}
            >
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Month</InputLabel>
                    <Select
                        label="Month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        {months.map((m) => (
                            <MenuItem key={m.value} value={m.value}>
                                {m.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>


            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sortedLogs.map((log) => (
                    <IndexLog key={log.id} log={log} />
                ))}

                {sortedLogs.length === 0 && (
                    <Typography color="text.secondary">No logs available.</Typography>
                )}

            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/logs")}
                >
                    All logs
                </Button>
            </Box>

        </Box>
    );
};

export default IndexPage;
