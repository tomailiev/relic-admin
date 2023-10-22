import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import CSVProps from "../../props/CSVProps";
import { deschematify } from "../../vars/schemaFunctions";

const CSVItem = ({ item, mutateItem }) => {

    const fetcher = useFetcher();
    const subscribers = useLoaderData();
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.submit({ fileName: item.csv?.name }, { method: 'POST' })
        } else if (fetcher.state === 'idle' && fetcher.data) {
            setSubs(fetcher.data.filter(item => !subscribers.includes(item.email)));
        }
    }, [item.csv?.name, fetcher, subscribers]);

    function filterer(model) {
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
                        checkboxSelection
                        onRowSelectionModelChange={filterer}
                        rows={subs}
                        columns={CSVProps.columns}
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