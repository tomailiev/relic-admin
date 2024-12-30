import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box } from "@mui/material";
// import { createRef, useEffect } from "react";
// import { getMap } from "../../utils/google-maps/getMap";
// import { DataGrid } from "@mui/x-data-grid";
import { Email, LocationOn, Loyalty, Style, ImportContacts, Event } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import subscriberProps from '../../props/subscriberProps'
import { useLocation } from "react-router-dom";

const SubscriberItem = ({ item }) => {

    console.log(item);
    
    const location = useLocation();

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h5" textAlign={'center'}>{item.firstName} {item.lastName}</Typography>
            <Grid key={item.id} container spacing={2} mt={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Container disableGutters sx={{ borderRadius: '4px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }} >
                        <img width={'50%'} src="https://upload.wikimedia.org/wikipedia/commons/f/f9/User_%2889041%29_-_The_Noun_Project.svg" alt="user avatar" />
                    </Container>
                </Grid>
                <Grid item md={6}>
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
                        {item.tags && <ListItem>
                            <ListItemIcon>
                                <Style />
                            </ListItemIcon>
                            <ListItemText primary={item.tags.map(({ tag }) => tag).join(', ')} />
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
                            <ListItemText primary={item.origin} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Event />
                            </ListItemIcon>
                            <ListItemText primary={`Contact since ${item.opt_in_time}`} />
                        </ListItem>
                    </List>

                </Grid>
            </Grid>
            {item.history && !location.pathname.endsWith('edit') && <Container maxWidth={false} disableGutters>
                <Typography variant="h6" mt={2}>
                    Interactions:
                </Typography>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={item.history?.map((historyItem, i) => ({ ...historyItem, id: i, }))}
                            columns={subscriberProps.historyColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'timestamp', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 5 } }
                            }}
                            pageSizeOptions={[5, 10, 25]}

                        />
                    </Box>
                </Box>
            </Container>}
        </Paper>
    );
};

export default SubscriberItem;