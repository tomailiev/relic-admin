import { Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useActionData, useFetcher, useLocation, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import { TaskItemProps } from "../../types/itemProps";
import { SubmitTarget } from "react-router-dom/dist/dom";
import UserContext from "../../context/UserContext";
import { AlarmOn, NotificationsActive, People } from "@mui/icons-material";
import StatusEntryDialog from "./StatusEntryDialog";
import { Timestamp } from "firebase/firestore";
import Tiptap from "../TipTap/Tiptap";
import { SimulatedEvent } from "../../types/SimulatedEvent";


const TaskItem = ({ item }: TaskItemProps) => {

    console.log(item);

    const { profile } = useContext(UserContext);

    const columns: GridColDef[] = [
        {
            field: 'datetime', headerName: 'Datetime', flex: 1, valueGetter: ({ row }) => {
                if (!row.datetime) return '';
                return row.datetime instanceof Timestamp
                    ? row.datetime.toDate()
                    : new Timestamp(row.datetime.seconds, row.datetime.nanoseconds).toDate()
            }
        },
        {
            field: 'author',
            headerName: 'Author',
            flex: 1
        },
        { field: 'entry', headerName: 'Entry', flex: 5 },

    ];

    const { setError } = useContext(ErrorContext);
    const [modalOpen, setModalOpen] = useState(false);
    // const [donationInfo, setDonationInfo] = useState<DonationInfo | null>(null);
    const submit = useSubmit();
    const actionData = useActionData() as { code: string };

    const fetcher = useFetcher();
    const location = useLocation();

    // useEffect(() => {
    //     if (fetcher.state === "idle" && !fetcher.data) {
    //         fetcher.load("/donors/text");
    //     }
    // }, [fetcher]);

    useEffect(() => {
        if (actionData) {
            if (actionData.code === 'Success') {
                setModalOpen(false);
                setError({ severity: 'success', message: 'Updated task status', error: true });
                // fetcher.load(location.pathname);
            } else {
                setError({ severity: 'error', message: actionData.code, error: true })
            }
        }
    }, [actionData, setError, fetcher, location.pathname]);

    function handleSend(data: { entry: string }) {
        // to, from, content, donorId, donationIndex
        const update = {
            author: profile?.displayName,
            entry: data.entry,
            id: item.id
        }

        submit(update as SubmitTarget, { method: 'POST', encType: 'application/json', action: `/tasks/${item.id}` });
    }

    function handleAddClick() {
        setModalOpen(true);
    }


    return (
        <>
            <StatusEntryDialog open={modalOpen} setOpen={setModalOpen} handleSend={handleSend as (data: object) => void} />
            <Paper sx={{ mx: 1, my: 2, py: 5, px: 2 }}>
                <Typography variant="h5" textAlign={'center'}>{item.name}</Typography>
                <Typography variant="body2" textAlign={'center'}>Description:</Typography>
                <Tiptap readOnly={true} content={item.description} inputName="description" onChange={(e: SimulatedEvent) => { }} />
                <Grid key={item.id} mt={2} container spacing={2} justifyContent="center" sx={{
                    position: 'relative',
                }}>

                    <Grid item md={6}>
                        <List>
                            {item.deadline &&
                                <ListItem>
                                    <ListItemIcon>
                                        <AlarmOn />
                                    </ListItemIcon>
                                    <ListItemText primary={item.deadline} />
                                </ListItem>
                            }
                            {(item.newUsers || item.users) && <ListItem>
                                <ListItemIcon>
                                    <People />
                                </ListItemIcon>
                                <ListItemText primary={item.newUsers ? item.newUsers.map(u => u.displayName).join(', ') : item.users.map(u => u).join(', ')} />
                            </ListItem>}
                            {item.reminder && <ListItem>
                                <ListItemIcon>
                                    <NotificationsActive />
                                </ListItemIcon>
                                <ListItemText primary={item.reminder} />
                            </ListItem>}
                        </List>
                    </Grid>
                </Grid>
                {item.status && <Container maxWidth={false} disableGutters>
                    <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item >
                            <Typography variant="h6" mt={2}>
                                Status Updates:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button size="small" variant="contained" onClick={handleAddClick}>New entry</Button>
                        </Grid>
                    </Grid>
                    <Box overflow={'scroll'}>
                        <Box minWidth={'800px'} width={'100%'}>
                            <DataGrid
                                rows={item.status.map((row, i) => ({ ...row, id: i }))}
                                columns={columns}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'datetime', sort: 'desc' }],
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Container>}
            </Paper>
        </>
    );
};

export default TaskItem;