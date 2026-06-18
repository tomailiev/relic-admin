import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button,
    Divider,
    Grid
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Task } from "../../types/DB";
import Tiptap from "../TipTap/Tiptap";
import { useNavigate } from "react-router-dom";
import { now } from "../../vars/dateObjects";

const TaskAccordion = ({ task, onNewEntry, onArchive }: { task: Task, onNewEntry: (task: Task) => void, onArchive: (id: string | undefined) => void }) => {

    const navigate = useNavigate();
    // Get latest status entry
    // const latest = task.status?.[task.status.length - 1] ?? null;

    const sortedStatus = [...task.status].sort(
        (a, b) => b.datetime.seconds - a.datetime.seconds
    );

    const latest = sortedStatus[0] ?? null;

    let deadlineMs = null;

    if (task.deadline) {
        // Convert "2026-06-30" → milliseconds
        const parsed = new Date(task.deadline + "T23:59:59");
        deadlineMs = parsed.getTime();
    }

    const isOverdue = deadlineMs && deadlineMs < now;

    const isApproaching =
        deadlineMs &&
        deadlineMs >= now &&
        deadlineMs <= now + 7 * 24 * 60 * 60 * 1000; // 7 days


    return (
        <Accordion
            elevation={2}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: isOverdue
                    ? "2px solid #d32f2f"        // overdue red
                    : isApproaching
                        ? "2px solid #B8860B"        // dark yellow (accessible)
                        : "1px solid transparent",
                backgroundColor: isOverdue
                    ? "#ffebee"
                    : isApproaching
                        ? "#fff8e1"
                        : "background.paper",
                "&:before": { display: "none" }
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    "& .MuiAccordionSummary-content": {
                        width: "100%",
                        alignItems: "center"
                    }
                }}
            >
                <Grid container alignItems="center" mr={2}>
                    {/* LEFT SIDE: name + latest */}
                    <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="h6" fontWeight={600}>
                                {task.name}
                            </Typography>

                            {latest ? (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    <strong>{latest.author}</strong>: {latest.entry}
                                </Typography>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No updates yet
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* RIGHT SIDE: Update status button */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={3}
                        xl={3}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "flex-start", sm: "flex-start", md: "flex-end" },
                            mt: { xs: 1, sm: 1, md: 0 }
                        }}
                    >
                        <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNewEntry(task);
                            }}
                            sx={{ whiteSpace: "nowrap" }} // ensures both words stay on one line
                        >
                            Update status
                        </Button>
                    </Grid>
                </Grid>
            </AccordionSummary>


            <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {/* Description */}
                    <Tiptap readOnly={true} inputName={task.name} onChange={() => { }} content={task.description} />

                    {/* Deadline / Reminder */}
                    <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                        {task.deadline && (
                            <Typography variant="body2" color={isOverdue || isApproaching ? "error.main" : "text.secondary"}>
                                Deadline: {task.deadline}
                            </Typography>
                        )}
                        {task.reminder && (
                            <Typography variant="body2" color="text.secondary">
                                Reminder: {task.reminder}
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Status entries */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {sortedStatus
                            .map((entry, idx) => (
                                <Box key={idx}>
                                    <Typography variant="body2" fontWeight={600}>
                                        {entry.author}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(entry.datetime.seconds * 1000).toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2">{entry.entry}</Typography>
                                </Box>
                            ))}
                    </Box>

                    {/* New entry button */}
                    {/* <Box sx={{ textAlign: "right", mt: 1 }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => onNewEntry(task)}
                        >
                            New entry
                        </Button>
                    </Box> */}
                    <Divider sx={{ my: 1 }} />

                    {/* Task Actions */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1.5,
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => navigate(`/tasks/${task.id}/edit`, { state: { redirectTo: '/' } })}
                        >
                            Update task
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => onArchive(task.id)}
                        >
                            Archive task
                        </Button>
                    </Box>

                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default TaskAccordion;
