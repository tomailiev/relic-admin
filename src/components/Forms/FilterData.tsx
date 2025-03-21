import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AnyItemType } from "../../types/DB";
import { ItemProps } from "../../types/fnProps";

const FilterData = ({ item, itemProps, handleFormCompletion }: {item: AnyItemType, itemProps: ItemProps, handleFormCompletion: (data: object) => void}) => {

    const [dataItems, setDataItems] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);

    useEffect(() => {
        if (itemProps.tempDestinationField && item[itemProps.tempDestinationField]) {
            setRowSelectionModel(item[itemProps.tempDestinationField].map(({ id }) => id));
            setDataItems(item[itemProps.tempDestinationField]);
        }
    }, [item, itemProps.tempDestinationField]);

    function filterer(model: GridRowSelectionModel) {
        setRowSelectionModel(model);
        const newDataItems = (item[itemProps.destinationCollectionField].filter(({ id }) => model.includes(id)));
        setDataItems(newDataItems)
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
                        columns={itemProps.dataFilterColumns[item[itemProps.sourceCollectionField]].filter(({ field }: GridColDef) => field !== 'select')}
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