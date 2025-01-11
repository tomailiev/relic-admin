import { Box, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CSVProps from "../../props/CSVProps";
import { deschematify } from "../../vars/schemaFunctions";

const DonorSubsItem = ({ mutateItem }) => {

    // const fetcher = useFetcher();
    const [donors, subscribers] = useLoaderData();
    const [subs, setSubs] = useState([]);
    // const location = useLocation();

    useEffect(() => {
        if (donors) {
            setSubs(donors.filter(({ email }) => {
                return !!email && !subscribers.find(({ id }) => id === email)
            }));
        }
    }, [donors, subscribers]);

    function filterer(model) {

        const newSubs = (subs.filter(({ id }) => model.includes(id)));
        console.log(newSubs);

        mutateItem(deschematify({ newSubs, final: '1' }, 'newSubs'));
    }


    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    {subs.length ? <DataGrid
                        checkboxSelection
                        onRowSelectionModelChange={filterer}
                        rows={subs}
                        columns={CSVProps.listColumns}
                        initialState={{
                            sorting: {
                                sortModel: [CSVProps.sorting],
                            },
                            pagination: { paginationModel: { pageSize: CSVProps.pageSize } }
                        }}
                        pageSizeOptions={CSVProps.pageSizeOptions}
                    />
                    : <Typography textAlign={'center'} variant="h5">Already up to date.</Typography>
                }
                </Box>
            </Box>
        </Container>
    );
};

export default DonorSubsItem;