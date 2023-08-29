import { Typography, Container, Button } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { Face } from "@mui/icons-material";




const Donors = () => {

    const donors = useLoaderData();

    const columns = [
        { field: 'icon', headerName: 'Avatar', sortable: false, flex: 0, renderCell: () => <Face /> },
        { field: 'firstName', headerName: 'First name', flex: 2 },
        { field: 'lastName', headerName: 'Last name', flex: 2 },
        {
            field: 'lastDonationDate',
            headerName: 'Last $ date',
            flex: 1
        },
        {
            field: 'lastDonationAmount',
            headerName: 'Last $ amount',
            valueFormatter: (params) => `$${params.value}`,
            flex: 1
        },
        {
            field: 'totalDonationsAmount',
            headerName: 'Total $ amount',
            valueGetter: ({row}) => `$${row.donations.reduce((acc, curr) => acc + curr.amount, 0)}`,
            flex: 1
        },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Link to={`/donors/${params.id}`}>
                    <Button variant="contained" disabled={params.row.error}>
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
                <NavLink to={'/donors/add-donation'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add donation
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <DataGrid
                    rows={donors}
                    columns={columns}
                />
            </Container>
        </>
    );
};

export default Donors;