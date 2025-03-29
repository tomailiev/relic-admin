import { Box, Container } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import CSVProps from "../../props/CSVProps";
import { AnyItemType, CSV, CSVItem, Subscriber } from "../../types/DB";
import { SubmitTarget } from "react-router-dom/dist/dom";
// import { deschematify } from "../../vars/schemaFunctions";

const CSVItem = ({ item, mutateItem }: { item: CSV, mutateItem: Dispatch<SetStateAction<{ newSubs: Subscriber[], final: string } | null>> }) => {

    const fetcher = useFetcher();
    const subscribers = useLoaderData() as CSVItem;
    const [subs, setSubs] = useState<Subscriber[]>([]);
    const location = useLocation();

    useEffect(() => {
        if (!(location.pathname === `/CSVs/${subscribers.id}`)) {
            if (fetcher.state === 'idle' && !fetcher.data) {
                fetcher.submit({ fileName: item.csvFile?.name || item.id } as SubmitTarget, { method: 'POST', encType: 'application/json' })
            } else if (fetcher.state === 'idle' && fetcher.data) {

                setSubs(fetcher.data.filter((item: { email: string }) => {
                    return !(subscribers.docs?.map(subscriber => subscriber.id).includes(item.email))
                }));
            }
        } else {
            setSubs(subscribers.docs);
        }
    }, [item.csvFile?.name, item.id, fetcher, subscribers, location.pathname]);

    function filterer(model: GridRowSelectionModel) {
        if (location.pathname === `/CSVs/${subscribers.id}`) {
            return;
        }
        const newSubs = (subs.filter(({ id }) => id && model.includes(id)));

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
                        columns={CSVProps.specialColumns || []}
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