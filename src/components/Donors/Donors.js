import { Typography, Container, Button } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';




const Donors = () => {

    const donors = useLoaderData();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'recognitionName',
            headerName: 'Recognition name',
            width: 160,
        },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <Link to={`/donors/${params.id}`}>
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
                    Donors
                </Typography>
                <NavLink to={'/donors/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add donation
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{my: 3}}>
                <DataGrid
                    rows={donors}
                    columns={columns}
                />
            </Container>
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Donors;