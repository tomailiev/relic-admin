import { Typography, Container, Button, Box } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import MapView from "./MapView";




const Donors = () => {

    const donors = useLoaderData();
    const [mapView, setMapView] = useState(false);

    const columns = [
        { field: 'firstName', headerName: 'First name', flex: 1 },
        { field: 'lastName', headerName: 'Last name', flex: 1 },
        {
            field: 'lastDonationDate',
            headerName: 'Last $ date',
            flex: 2
        },
        {
            field: 'lastDonationAmount',
            headerName: 'Last $ amount',
            valueFormatter: (params) => `$${params.value}`,
            flex: 1,
            sortComparator: (v1, v2) => v1 - v2,
        },
        {
            field: 'totalDonationsAmount',
            headerName: 'Total $ amount',
            valueGetter: ({ row }) => `$${row.donations?.reduce((acc, curr) => acc + curr.amount, 0)}`,
            flex: 1,
            sortComparator: (v1, v2) => Number(v1.substring(1)) - Number(v2.substring(1)),
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
                <Box sx={{ display: 'flex', flexDirection: 'row', py: 1 }}>
                    <Button
                        color="inherit"
                        disabled={!mapView}
                        variant="outlined"
                        onClick={() => setMapView(false)}
                    >
                        Grid view
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        color="inherit"
                        disabled={mapView}
                        variant="outlined"
                        onClick={() => setMapView(true)}
                    >
                        Map view
                    </Button>
                </Box>
                {mapView
                    ? <MapView donors={donors} />
                    : <DataGrid
                        rows={donors}
                        columns={columns}
                        initialState={{
                            sorting: {
                              sortModel: [{ field: 'lastDonationDate', sort: 'desc' }],
                            },
                          }}
                    />}
            </Container>
        </>
    );
};

export default Donors;