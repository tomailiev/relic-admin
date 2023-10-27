import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import CSVProps from "../../props/CSVProps";
import { deschematify } from "../../vars/schemaFunctions";

const CSVItem = ({ item, mutateItem }) => {

    const fetcher = useFetcher();
    const subscribers = useLoaderData();
    const [subs, setSubs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!(location.pathname === `/CSVs/${subscribers.id}`)) {
            // console.log(subscribers);
            if (fetcher.state === 'idle' && !fetcher.data) {
                fetcher.submit({ fileName: item.csv?.name }, { method: 'POST' })
            } else if (fetcher.state === 'idle' && fetcher.data) {
                setSubs(fetcher.data.filter(item => !subscribers.docs?.includes(item.email)));
            }
        } else {
            console.log(location.pathname);
            setSubs(subscribers.docs);
        }
    }, [item.csv?.name, fetcher, subscribers, location.pathname]);

    function filterer(model) {
        if (location.pathname === `/CSVs/${subscribers.id}`) {
            return;
        }
        const newSubs = (subs.filter(({ id }) => model.includes(id)));
        console.log(newSubs);

        mutateItem(deschematify({ newSubs, final: '1' }, 'newSubs'));
    }

    // useEffect(() => {
    //     console.log(2);
    //     if (fetcher.data && subs) {
    //     }
    // }, [subs, subscribers]);

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