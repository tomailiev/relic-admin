import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { createRef, useContext, useEffect, useState } from "react";
import { getMap } from "../../utils/google-maps/getMap";
import { DataGrid } from "@mui/x-data-grid";
import DonorFields from "./DonorFields";
import ThankDialog from "./ThankDialog";
import { useActionData, useFetcher, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";


const DonorItem = ({ item }) => {

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
            flex: 2
        },
        {
            field: 'thank',
            headerName: 'Acknowledge',
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return <Button variant="contained" disabled={params.row.thanksDisabled || !!params.row.acknowledged} onClick={() => handleThanksClick(params.row.id)}>
                    {params.row.acknowledged ? 'Thanked' : 'Thank'}
                </Button>
            }
        }
    ];

    const { setError } = useContext(ErrorContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [donationInfo, setDonationInfo] = useState(null);
    const submit = useSubmit();
    const actionData = useActionData();

    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/donors/text");
        }
    }, [fetcher]);

    useEffect(() => {
        if (actionData) {
            console.log(actionData);
            if (actionData.code === 'Success') {
                setModalOpen(false);
                setError({ severity: 'success', message: 'Sent email' })
            } else {
                setError({ severity: 'error', message: 'Something went wrong' })
            }
        }
    }, [actionData, setError]);

    function handleSend(emailInfo) {
        // to, from, content, donorId, donationIndex
        const update = {
            to: emailInfo.email,
            from: emailInfo.from,
            content: emailInfo.content,
            subject: emailInfo.subject,
            donorId: item.id,
            donationIndex: donationInfo.index
        }

        submit(update, { method: 'POST', encType: 'application/json', action: `/donors/${item.id}` });
    }

    function handleThanksClick(i) {
        const recognitionName = item.donations[i].recognitionName === '(anonymous)'
            ? `${item.firstName} ${item.lastName}`
            : item.donations[i].recognitionName;

        setDonationInfo({
            ...item.donations[i],
            email: item.email,
            index: i,
            recognitionName,
            content: fetcher.data?.content,
            subject: fetcher.data?.subject
        });
        setModalOpen(true);
    }

    const mapRef = createRef();
    useEffect(() => {
        getMap(mapRef.current, item.address, item.location)
            .then(infoWindow => {
                infoWindow.setContent(`${item.address || ''} ${item.location || ''}`)
            })
            .catch(e => console.log(e))
    }, [item, mapRef]);

    return (
        <>
            <ThankDialog open={modalOpen} setOpen={setModalOpen} handleSend={handleSend} donationInfo={donationInfo} />
            <Paper sx={{ mx: 8, my: 2, p: 5, }}>
                <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                    position: 'relative',
                }}>
                    <Grid item md={6} sm={8} xs={12} p={6}>
                        <Container disableGutters ref={mapRef} sx={{ width: '100%', height: '300px', borderRadius: '4px' }} />
                    </Grid>
                    <Grid item md={6}>
                        <DonorFields donor={item} />
                    </Grid>
                </Grid>
                {item.donations && <Container maxWidth={false} disableGutters>
                    <Typography variant="h6" mt={2}>
                        Donations:
                    </Typography>
                    <Box overflow={'scroll'}>
                        <Box minWidth={'800px'} width={'100%'}>
                            <DataGrid
                                rows={item.donations?.map((donation, i) => ({ ...donation, id: i, thanksDisabled: !item.email }))}
                                columns={columns}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'date', sort: 'desc' }],
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </Container>}
            </Paper>
        </>
    );
};

export default DonorItem;