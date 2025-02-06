import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const FilterData = ({ items, itemProps, handleFormCompletion }) => {

    function filterer(model) {
        const newSubs = (subs.filter(({ id }) => model.includes(id)));

        handleFormCompletion({ newSubs, final: '1' });
    }

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Box overflow={'scroll'}>
                <Box minWidth={'800px'} width={'100%'}>
                    <DataGrid
                        checkboxSelection
                        onRowSelectionModelChange={filterer}
                        rows={items}
                        columns={itemProps.dataFilterColumns[itemProps.sourceCollectionField]}
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