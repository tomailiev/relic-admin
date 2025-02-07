import { Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const FilterData = ({ item, itemProps, handleFormCompletion }) => {

    const [dataItems, setDataItems] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    useEffect(() => {
        if (item[itemProps.tempDestinationField]) {
            setRowSelectionModel(item[itemProps.tempDestinationField].map(({ id }) => id));
        }
    }, [item, itemProps.tempDestinationField]);

    function filterer(model) {
        setRowSelectionModel(model);
        const newSubs = (item[itemProps.destinationCollectionField].filter(({ id }) => model.includes(id)));
        setDataItems(newSubs)
    }

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    <DataGrid
                        checkboxSelection
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={filterer}
                        rows={item[itemProps.destinationCollectionField]}
                        columns={itemProps.dataFilterColumns[item[itemProps.sourceCollectionField]].filter(({ field }) => field !== 'select')}
                        initialState={{
                            sorting: {
                                sortModel: [itemProps.sorting],
                            },
                            pagination: { paginationModel: { pageSize: itemProps.pageSize } }
                        }}
                        pageSizeOptions={itemProps.pageSizeOptions}
                    />
                </Box>
            </Box>
            <Box textAlign={'center'} mt={2}>

                <Button variant={'contained'} onClick={() => handleFormCompletion(dataItems)}>Submit</Button>
            </Box>
        </Container>
    );
};

export default FilterData;