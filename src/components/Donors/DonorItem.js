import { Container, Grid, Paper, Typography } from "@mui/material";
import { createRef, useEffect } from "react";
import { getMap } from "../../utils/google-maps/getMap";
import { DataGrid } from "@mui/x-data-grid";
import DonorFields from "./DonorFields";

const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    {
        field: 'amount',
        headerName: 'Amount',
        valueFormatter: (params) => `$${params.value}`,
        flex: 1
    },
    { field: 'campaign', headerName: 'Campaign', flex: 1 },
    { field: 'recognitionName', headerName: 'Recognition name', flex: 1 },
    {
        field: 'comment',
        headerName: 'Comment',
        flex: 3
    },
]

const DonorItem = ({ item }) => {
    const mapRef = createRef();

    useEffect(() => {
        getMap(mapRef.current, item.address, item.location)
            .then(infoWindow => {
                infoWindow.setContent(`${item.address || ''} ${item.location || ''}`)
            })
            .catch(e => console.log(e))
    }, [item, mapRef]);

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Container ref={mapRef} sx={{ width: '100%', height: '300px', borderRadius: '4px' }} />
                </Grid>
                <Grid item md={6}>
                    <DonorFields donor={item} />
                </Grid>
            </Grid>
            {item.donations && <Container disableGutters>
                <Typography variant="h6" mt={2}>
                    Donations:
                </Typography>

                <DataGrid
                    rows={item.donations?.map((item, i) => ({ ...item, id: i }))}
                    columns={columns}
                />
            </Container>}
        </Paper>
    );
};

export default DonorItem;