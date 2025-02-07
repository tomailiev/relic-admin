import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box, Avatar } from "@mui/material";
import { Source, CalendarToday } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import listProps from '../../props/listProps'

const EmailListItem = ({ item }) => {


    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h5" textAlign={'center'}>{item.name}</Typography>
            <Grid key={item.id} container spacing={2} mt={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Container disableGutters sx={{ borderRadius: '4px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }} >
                        <Avatar alt={item?.source} >{item?.source === 'donors' ? 'D' : 'S'}</Avatar>
                    </Container>
                </Grid>
                <Grid item md={6}>
                    <List>
                        {item.source && <ListItem>
                            <ListItemIcon>
                                <Source />
                            </ListItemIcon>
                            <ListItemText primary={item.source} />
                        </ListItem>}
                        {item.datetime && <ListItem>
                            <ListItemIcon>
                                <CalendarToday />
                            </ListItemIcon>
                            <ListItemText primary={item.datetime.toDate().toString()} />
                        </ListItem>}
                    </List>
                </Grid>
            </Grid>
            <Container maxWidth={false} disableGutters>
                <Typography variant="h6" mt={2}>
                    Members:
                </Typography>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={item.members}
                            columns={listProps.dataFilterColumns[item.source]}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'datetime', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 5 } }
                            }}
                            pageSizeOptions={[5, 10, 25]}
                        />
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default EmailListItem;