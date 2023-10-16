import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import CSVProps from "../../props/CSVProps";

const CSVItem = ({ item }) => {

    const fetcher = useFetcher();
    const [subs, setSubs] = useState([]);

    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.submit({ fileName: item.csv.name }, { method: 'POST' })
        }
    }, [item.csv, fetcher]);

    useEffect(() => {
        if (fetcher.data && fetcher.data && subs) {
            setSubs(fetcher.data);
        }
    }, [fetcher.data, subs]);

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    <DataGrid
                        checkboxSelection
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