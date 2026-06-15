import {
    Box,
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Divider
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useActionData, useSubmit, useLocation } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import UserContext from "../../context/UserContext";
import { AlarmOn, NotificationsActive, People } from "@mui/icons-material";
import StatusEntryDialog from "./StatusEntryDialog";
import { Timestamp } from "firebase/firestore";
import Tiptap from "../TipTap/Tiptap";
import { SimulatedEvent } from "../../types/SimulatedEvent";
import { TaskItemProps } from "../../types/itemProps";

const TaskItem = ({ item }: TaskItemProps) => {
    const { currentUser } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);

    const [modalOpen, setModalOpen] = useState(false);
    const submit = useSubmit();
    const actionData = useActionData() as { code: string };
    const location = useLocation();

    // Latest status entry
    const latest = item.status?.[item.status.length - 1] ?? null;

    // Handle action response
    useEffect(() => {
        if (actionData) {
            if (actionData.code === "Success") {
                setModalOpen(false);
                setError({
                    severity: "success",
                    message: "Updated task status",
                    error: true,
                });
            } else {
                setError({
                    severity: "error",
                    message: actionData.code,
                    error: true,
                });
            }
        }
    }, [actionData, setError, location.pathname]);

    // Submit new entry
    function handleSend(data: { entry: string }) {
        const update = {
            author: currentUser?.displayName,
            entry: data.entry,
            id: item.id,
        };

        submit(update as any, {
            method: "POST",
            encType: "application/json",
            action: `/tasks/${item.id}`,
        });
    }

    return (
        <>
            <StatusEntryDialog
                open={modalOpen}
                setOpen={setModalOpen}
                handleSend={handleSend as (data: object) => void}
            />

            <Box
                sx={{
                    mx: 1,
                    my: 2,
                    p: 3,
                    borderRadius: 2,
                    // boxShadow: 3,
                }}
            >
                {/* HEADER (Accordion-style) */}
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h5" fontWeight={700}>
                        {item.name}
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

                <Divider sx={{ my: 2 }} />

                {/* DESCRIPTION */}
                <Typography variant="body2" fontWeight={600} textAlign="center">
                    Description:
                </Typography>

                <Tiptap
                    readOnly={true}
                    content={item.description}
                    inputName="description"
                    onChange={(e: SimulatedEvent) => { }}
                />

                {/* METADATA */}
                <Grid container spacing={2} mt={2} justifyContent="center">
                    <Grid item md={6}>
                        <List>
                            {item.deadline && (
                                <ListItem>
                                    <ListItemIcon>
                                        <AlarmOn />
                                    </ListItemIcon>
                                    <ListItemText primary={item.deadline} />
                                </ListItem>
                            )}

                            {(item.newUsers || item.users) && (
                                <ListItem>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            item.newUsers
                                                ? item.newUsers.map((u) => u.displayName).join(", ")
                                                : item.users.join(", ")
                                        }
                                    />
                                </ListItem>
                            )}

                            {item.reminder && (
                                <ListItem>
                                    <ListItemIcon>
                                        <NotificationsActive />
                                    </ListItemIcon>
                                    <ListItemText primary={item.reminder} />
                                </ListItem>
                            )}
                        </List>
                    </Grid>
                </Grid>

                {/* STATUS UPDATES (TaskAccordion-style) */}
                {item.status && (
                    <Container disableGutters sx={{ mt: 3 }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                        >
                            <Typography variant="h6">Status Updates:</Typography>

                            <Button
                                size="small"
                                variant="contained"
                                onClick={() => setModalOpen(true)}
                            >
                                New entry
                            </Button>
                        </Box>
                        <Divider sx={{ my: 1 }} />

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {item.status
                                .slice()
                                .sort(
                                    (a, b) =>
                                        (b.datetime?.seconds ?? 0) - (a.datetime?.seconds ?? 0)
                                )
                                .map((entry, idx) => (
                                    <Box key={idx}>
                                        <Typography variant="body2" fontWeight={600}>
                                            {entry.author}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(
                                                entry.datetime.seconds * 1000
                                            ).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2">{entry.entry}</Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Container>
                )}
            </Box>
        </>
    );
};

export default TaskItem;
