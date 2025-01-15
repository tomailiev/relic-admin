import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import CSVProps from "../../props/CSVProps";
// import { deschematify } from "../../vars/schemaFunctions";

const CSVItem = ({ item, mutateItem }) => {

    const fetcher = useFetcher();
    const subscribers = useLoaderData();
    const [subs, setSubs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!(location.pathname === `/CSVs/${subscribers.id}`)) {
            if (fetcher.state === 'idle' && !fetcher.data) {
                fetcher.submit({ fileName: item.csvFile?.name || item.id }, { method: 'POST', encType: 'application/json' })
            } else if (fetcher.state === 'idle' && fetcher.data) {

                setSubs(fetcher.data.filter(item => {
                    return !(subscribers.docs?.map(subscriber => subscriber.id).includes(item.email))
                }));
            }
        } else {
            setSubs(subscribers.docs);
        }
    }, [item.csvFile?.name, item.id, fetcher, subscribers, location.pathname]);

    function filterer(model) {
        if (location.pathname === `/CSVs/${subscribers.id}`) {
            return;
        }
        const newSubs = (subs.filter(({ id }) => model.includes(id)));

        mutateItem({ newSubs, final: '1' });
    }


    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    <DataGrid
                        checkboxSelection={location.pathname !== `/CSVs/${subscribers.id}`}
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

export default CSVItem;