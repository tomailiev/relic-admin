import { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate, useLoaderData, useSubmit } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Log, Task } from "../../types/DB";
import TaskAccordion from "./TaskAccordion";
import StatusEntryDialog from "../Tasks/StatusEntryDialog";
import { SubmitTarget } from "react-router-dom/dist/dom";

const IndexPage = () => {
    const { currentUser } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState('');

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

    // Sort tasks by latest status datetime
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    const sortedTasks = [...tasks].sort((a, b) => {
        const aDeadline = a.deadline ?? null;
        const bDeadline = b.deadline ?? null;

        const aOverdue = aDeadline && aDeadline < today;
        const bOverdue = bDeadline && bDeadline < today;

        // Overdue tasks first
        if (aOverdue && !bOverdue) return -1;
        if (!aOverdue && bOverdue) return 1;

        // Otherwise sort by latest status datetime
        const aLatest = a.status?.[a.status.length - 1]?.datetime?.seconds ?? 0;
        const bLatest = b.status?.[b.status.length - 1]?.datetime?.seconds ?? 0;

        return bLatest - aLatest;
    });


    // Sort logs by date (yyyy-mm-dd)
    const sortedLogs = [...logs].sort((a, b) =>
        b.date.localeCompare(a.date)
    );

    function onNewEntry(task: Task) {
        setEditedTask(task.id || '');
        setModalOpen(true);
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
                    onClick={() => navigate("/tasks/add")}
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
                    onClick={() => navigate("/logs/add")}
                >
                    New Log
                </Button>
            </Box>


            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sortedLogs.map((log) => (
                    <Paper
                        key={log.id}
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography variant="body1" fontWeight={600}>
                                {log.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {log.date}
                            </Typography>
                        </Box>

                        <Typography variant="body1" fontWeight={600}>
                            {log.hours} hrs
                        </Typography>
                    </Paper>
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
