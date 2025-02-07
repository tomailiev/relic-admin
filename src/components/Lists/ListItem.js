import { Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box } from "@mui/material";
import {  CalendarToday } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import listProps from '../../props/listProps'

const EmailListItem = ({ item }) => {


    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h5" textAlign={'center'}>{item.name}</Typography>
            <Typography variant="body2" textAlign={'center'}>{item.source}</Typography>
            <Grid key={item.id} container justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <CalendarToday />
                            </ListItemIcon>
                            <ListItemText primary={item.datetime.toDate().toUTCString()} />
                        </ListItem>
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
                            rows={item.newMembers || item.members}
                            columns={listProps.dataFilterColumns[item.source]}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'datetime', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10, 25, 50]}
                        />
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default EmailListItem;