import { Typography, Container, Button, Box } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import MapView from "./MapView";
import CustomGridToolbar from "../Common/GridExportToolbar";
import donorProps from "../../props/donorProps";




const Donors = () => {

    const donors = useLoaderData();
    const [mapView, setMapView] = useState(false);

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
                <Box sx={{ display: 'flex', flexDirection: 'row', pb: 1 }}>
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
                    : <Box overflow={'scroll'}>
                        <Box minWidth={'800px'} width={'100%'}>
                            <DataGrid
                                rows={donors}
                                columns={donorProps.columns}
                                slots={{toolbar: CustomGridToolbar}}
                                initialState={{
                                    sorting: {
                                        sortModel: [donorProps.sorting],
                                    },
                                    pagination: { paginationModel: { pageSize: donorProps.pageSize } }
                                }}
                                pageSizeOptions={donorProps.pageSizeOptions}
                            />
                        </Box>
                    </Box>}
            </Container>
        </>
    );
};

export default Donors;