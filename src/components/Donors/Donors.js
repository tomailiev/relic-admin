import { Typography, Container, Button, Box, Paper, TextField, Stack } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import MapView from "./MapView";
import CustomGridToolbar from "../Common/GridExportToolbar";
import donorProps from "../../props/donorProps";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const oneYearAgoFromTomorrow = new Date(tomorrow);
oneYearAgoFromTomorrow.setFullYear(oneYearAgoFromTomorrow.getFullYear() - 1);
const oneYearAgoFromTomorrowDateString = oneYearAgoFromTomorrow.toISOString().substring(0, 10);
const todayDateString = today.toISOString().substring(0, 10);

const Donors = () => {

    const donors = useLoaderData();
    const [mapView, setMapView] = useState(false);
    const [startDate, setStartDate] = useState(oneYearAgoFromTomorrowDateString);
    const [endDate, setEndDate] = useState(todayDateString);
    const [donationsAmount, setDonationsAmount] = useState(0);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        setDonationsAmount(donors
            .map(donor => donor.donations
                .filter(donation => new Date(donation.date) >= start && new Date(donation.date) <= end)
                .reduce((a, c) => a + c.amount, 0))
            .reduce((a, c) => a + c, 0))
    }, [donors, endDate, startDate])

    function updateDateValue(e) {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value)
        } else {
            setEndDate(e.target.value);
        }

    }

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Donors
                </Typography>
                <NavLink to={'/donors/new-donation'} >
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
                <Box>
                    <Paper sx={{ my: 2, border: '1px solid #e0e0e0', py: 0.2 }}>
                        <Stack direction={'row'} spacing={1.6} justifyContent={'center'}>
                            <Typography pt={2} fontSize={'1.1em'}>{'Total donations from '}</Typography>
                            <TextField
                                id={'startDate'}
                                name={'startDate'}
                                type={'date'}
                                value={startDate}
                                onChange={updateDateValue}
                                label={'Start date'}
                                size={'small'}
                                variant={'standard'}
                                InputProps={{
                                    inputProps: {
                                        max: todayDateString,
                                    }
                                }}
                            />
                            <Typography pt={2} fontSize={'1.1em'}>{' to '}</Typography>
                            <TextField
                                id={'endDate'}
                                name={'endDate'}
                                type={'date'}
                                value={endDate}
                                onChange={updateDateValue}
                                label={'End date'}
                                size={'small'}
                                variant={'standard'}
                                InputProps={{
                                    inputProps: {
                                        max: todayDateString,
                                    }
                                }}
                            />
                            <Typography pt={2} fontWeight={'bold'} fontSize={'1.1em'} sx={{textDecoration: 'underline'}}>
                                {' $' + donationsAmount.toLocaleString()}
                            </Typography>
                        </Stack>
                    </Paper>
                </Box>
                {mapView
                    ? <MapView donors={donors} />
                    : <Box overflow={'scroll'}>
                        <Box minWidth={'800px'} width={'100%'}>
                            <DataGrid
                                rows={donors}
                                columns={donorProps.columns}
                                slots={{ toolbar: CustomGridToolbar }}
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
            </Container >
        </>
    );
};

export default Donors;