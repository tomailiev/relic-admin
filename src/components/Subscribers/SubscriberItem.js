import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box } from "@mui/material";
// import { createRef, useEffect } from "react";
// import { getMap } from "../../utils/google-maps/getMap";
// import { DataGrid } from "@mui/x-data-grid";
import { Email, Face, LocationOn, Loyalty, Style } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import subscriberProps from '../../props/subscriberProps'

const SubscriberItem = ({ item }) => {

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                {/* <Grid item md={6} sm={8} xs={12} p={6}>
                    <Container disableGutters ref={mapRef} sx={{ width: '100%', height: '300px', borderRadius: '4px' }} />
                </Grid> */}
                <Grid item md={6}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Face />
                            </ListItemIcon>
                            <ListItemText primary={`${item.firstName} ${item.lastName}`} primaryTypographyProps={{ variant: 'h5' }} />
                        </ListItem>
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
                            <ListItemText primary={item.tags.join(', ')} />
                        </ListItem>}
                        <ListItem>
                            <ListItemIcon>
                                <Loyalty />
                            </ListItemIcon>
                            <ListItemText primary={item.status ? 'Subscribed' : 'Unsubscribed'} />
                        </ListItem>
                    </List>

                </Grid>
            </Grid>
            {item.history && <Container maxWidth={false} disableGutters>
                <Typography variant="h6" mt={2}>
                    Tags:
                </Typography>
                <Box overflow={'scroll'}>
                        <Box minWidth={'800px'} width={'100%'}>
                            <DataGrid
                                rows={item.history?.map((historyItem, i) => ({ ...historyItem, id: i, }))}
                                columns={subscriberProps.historyColumns}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'timestamp', sort: 'desc' }],
                                    }
                                }}
                            />
                        </Box>
                    </Box>
            </Container>}
        </Paper>
    );
};

export default SubscriberItem;