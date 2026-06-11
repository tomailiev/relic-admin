import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Button,
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Task } from "../../types/DB";
import Tiptap from "../TipTap/Tiptap";

const TaskAccordion = ({ task, onNewEntry }: { task: Task, onNewEntry: (task: Task) => void }) => {
    // Get latest status entry
    const latest = task.status?.[task.status.length - 1] ?? null;

    const isOverdue =
        task.deadline &&
        task.deadline < new Date().toISOString().slice(0, 10);

    return (
        <Accordion
            elevation={2}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                border: isOverdue ? "2px solid #d32f2f" : "1px solid transparent",
                backgroundColor: isOverdue ? "rgba(211, 47, 47, 0.08)" : "background.paper",
                "&:before": { display: "none" }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography variant="h6" fontWeight={600} color={isOverdue ? "error.main" : "inherit"}>
                        {task.name}
                    </Typography>

                    {latest && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            <strong>{latest.author}</strong>: {latest.entry}
                        </Typography>
                    )}

                    {!latest && (
                        <Typography variant="body2" color="text.secondary">
                            No updates yet
                        </Typography>
                    )}
                </Box>
            </AccordionSummary>

            <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {/* Description */}
                    <Tiptap readOnly={true} inputName={task.name} onChange={() => { }} content={task.description} />

                    {/* Deadline / Reminder */}
                    <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                        {task.deadline && (
                            <Typography variant="body2" color={isOverdue ? "error.main" : "text.secondary"}>
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
                        {task.status.map((entry, idx) => (
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
                    <Box sx={{ textAlign: "right", mt: 1 }}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => onNewEntry(task)}
                        >
                            New entry
                        </Button>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default TaskAccordion;
