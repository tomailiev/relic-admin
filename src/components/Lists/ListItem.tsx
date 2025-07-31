import { List, ListItem, ListItemIcon, ListItemText, Paper, Container, Typography, Box } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import listProps from '../../props/listProps'
import { ListWithNewMembers } from "../../types/itemProps";

const EmailListItem = ({ item }: { item: ListWithNewMembers }) => {


    return (
        <Paper sx={{ mx: 1, my: 2, py: 5, px: 2 }}>
            <Typography variant="h5" textAlign={'center'}>{item.name}</Typography>
            <Typography variant="body2" textAlign={'center'}>{item.source}</Typography>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <List>
                    {item.datetime && <ListItem>
                        <ListItemIcon>
                            <CalendarToday />
                        </ListItemIcon>
                        <ListItemText primary={item.datetime?.toDate().toUTCString()} />
                    </ListItem>}
                </List>
            </Box>
            <Container maxWidth={false} disableGutters>
                <Typography variant="h6" mt={2}>
                    Members:
                </Typography>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        {listProps.dataFilterColumns && <DataGrid
                            rows={item.newMembers || item.members}
                            columns={listProps.dataFilterColumns[item.source]}
                            initialState={{
                                // sorting: {
                                //     sortModel: [{ field: 'datetime', sort: 'desc' }],
                                // },
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10, 20, 50]}
                        />}
                    </Box>
                </Box>
            </Container>
        </Paper>
    );
};

export default EmailListItem;