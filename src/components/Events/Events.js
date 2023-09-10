import { Typography, Container, Button, Avatar } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
// import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";




const Events = () => {

    const events = useLoaderData();
    const columns = [
        {
            field: 'icon',
            headerName: 'Avatar',
            sortable: false, flex: 0,
            renderCell: (params) => {
                return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.name} />
            }
        },
        // { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'title', headerName: 'Title', flex: 2 },
        { field: 'description', headerName: 'Description', flex: 4 },
        {
            field: 'season', headerName: 'Season', flex: 1, valueGetter: (params) => {
                const date = params.row.dateDone.toDate();
                const month = date.getUTCMonth();
                const year = date.getUTCFullYear();
                return month >= 7 ? year - 2021 : year - 2022
            }
        },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <Link to={`/events/${params.id}`}>
                    <Button variant="contained">
                        View
                    </Button>
                </Link>
            )
        }
    ];


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
                    columns={columns}
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