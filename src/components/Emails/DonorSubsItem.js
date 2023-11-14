import { Box, Container } from "@mui/material";
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
            const subscriberEmails = subscribers.map(item => item.email);
            setSubs(donors.filter(({ email }) => {
                return !!email && !(subscriberEmails.includes(email.toLowerCase()))
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
                    <DataGrid
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
                </Box>
            </Box>
        </Container>
    );
};

export default DonorSubsItem;