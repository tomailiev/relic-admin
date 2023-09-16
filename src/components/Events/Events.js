import { Typography, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { eventColumns } from "../../vars/columns";




const Events = () => {

    const events = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Events
                </Typography>
                <NavLink to={'/events/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <DataGrid
                    rows={events}
                    columns={eventColumns}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'season', sort: 'desc' }],
                        },
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 20, 30]}
                />
            </Container>
        </>
    );
};

export default Events;