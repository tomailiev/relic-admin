import { List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box } from "@mui/material";
import { Email, LocationOn, Loyalty, Style, ImportContacts, Event, AutoAwesomeMotion } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import subscriberProps from '../../props/subscriberProps'
import { Link, useLocation } from "react-router-dom";
import { DeschematifiedSubscriber } from "../../types/DB";


const SubscriberItem = ({ item }: { item: DeschematifiedSubscriber }) => {

    const location = useLocation();

    return (
        <Paper sx={{ mx: 1, my: 2, py: 5, px: 2 }}>
            <Typography variant="h5" textAlign={'center'}>{item.firstName} {item.lastName}</Typography>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <List>
                    {item.email && <ListItem>
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText primary={item.email} />
                    </ListItem>}
                    {item.location && <ListItem>
                        <ListItemIcon>
                            <LocationOn />
                        </ListItemIcon>
                        <ListItemText primary={item.location} />
                    </ListItem>}
                    {item.tags && !!item.lists.length && <ListItem>
                        <ListItemIcon>
                            <Style />
                        </ListItemIcon>
                        <ListItemText primary={item.tags.map(({ tag }) => tag).join(', ')} />
                    </ListItem>}
                    {item.lists && !!item.lists.length && <ListItem>
                        <ListItemIcon>
                            <AutoAwesomeMotion />
                        </ListItemIcon>
                        <List>
                            {item.lists.map(list => (
                                <ListItem>
                                    <Typography >
                                        <Link key={list} to={`/lists/${list}`}>
                                            {list}
                                        </Link>
                                    </Typography>
                                </ListItem>
                            ))}

                        </List>
                    </ListItem>}
                    <ListItem>
                        <ListItemIcon>
                            <Loyalty />
                        </ListItemIcon>
                        <ListItemText primary={item.status} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <ImportContacts />
                        </ListItemIcon>
                        <ListItemText primary={item.origin} sx={{ overflow: 'clip' }} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Event />
                        </ListItemIcon>
                        <ListItemText primary={`Contact since ${item.opt_in_time}`} />
                    </ListItem>
                </List>
            </Box>
            {item.history && !location.pathname.endsWith('edit') && <Container maxWidth={false} disableGutters>
                <Typography variant="h6" mt={2}>
                    Interactions:
                </Typography>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        {subscriberProps.dataFilterColumns?.history && <DataGrid
                            rows={item.history?.map((historyItem, i) => ({ ...historyItem, id: i, }))}
                            columns={subscriberProps.dataFilterColumns?.history}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'timestamp', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 5 } }
                            }}
                            pageSizeOptions={[5, 10, 25]}

                        />}
                    </Box>
                </Box>
            </Container>}
        </Paper>
    );
};

export default SubscriberItem;