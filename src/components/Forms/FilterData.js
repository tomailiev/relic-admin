import { Box, Button, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const FilterData = ({ item, itemProps, handleFormCompletion }) => {

    const [dataItems, setDataItems] = useState([]);

    function filterer(model) {
        const newSubs = (item[itemProps.destinationCollectionField].filter(({ id }) => model.includes(id)));
        setDataItems(newSubs)

        // handleFormCompletion({ newSubs, final: '1' });
    }

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    <DataGrid
                        checkboxSelection
                        onRowSelectionModelChange={filterer}
                        rows={item[itemProps.destinationCollectionField]}
                        columns={itemProps.dataFilterColumns[item[itemProps.sourceCollectionField]]}
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
            <Box textAlign={'center'}>

            <Button variant={'contained'} onClick={() => handleFormCompletion(dataItems)}>Submit</Button>
            </Box>
        </Container>
    );
};

export default FilterData;