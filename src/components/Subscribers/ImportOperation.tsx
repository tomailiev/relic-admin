import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLoaderData, useSubmit } from "react-router-dom";
import { Operation } from "../../types/DB";

const ImportOperation = () => {

    const submit = useSubmit();
    const operations = useLoaderData() as Operation[];

    function handleSubmit(row: Operation) {
        console.log(row.eventbriteId);
        
        submit({ eventbriteId: row.eventbriteId }, { encType: 'application/json', method: 'post' });
    }

    const operationColumns: GridColDef[] = [
        {
            field: 'icon',
            headerName: 'Avatar',
            sortable: false, flex: 0,
            renderCell: (params) => {
                return <Avatar src={params.row?.avatar} alt={params.row?.name} />
            }
        },
        { field: 'title', headerName: 'Title', flex: 2 },
        { field: 'eventDate', headerName: 'Date', flex: 2, valueGetter: ({ row }) => new Date(row.eventDate).toLocaleString() },
        {
            field: 'venueName',
            headerName: 'Venue',
            flex: 3,
        },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleSubmit(params.row)}>
                    Select
                </Button>
            )
        }
    ];

    return <Box m={4}>
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    {operations.length
                        ? <DataGrid
                            checkboxSelection
                            rows={operations}
                            columns={operationColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'eventDate', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 20 } }
                            }}
                            pageSizeOptions={[10, 20, 50]}
                        />
                        : <Typography textAlign={'center'} variant="h5">Already up to date.</Typography>
                    }
                </Box>
            </Box>
        </Container>
    </Box>
}

export default ImportOperation;