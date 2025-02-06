import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const FilterData = ({ item, itemProps, handleFormCompletion }) => {
    console.log(itemProps.dataFilterColumns[item[itemProps.sourceCollectionField]]);
    
    function filterer(model) {
        const newSubs = (item[itemProps.sourceCollectionField].filter(({ id }) => model.includes(id)));

        handleFormCompletion({ newSubs, final: '1' });
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
        </Container>
    );
};

export default FilterData;