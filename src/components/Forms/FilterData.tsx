import { Box, Button, Container } from "@mui/material";
import { DataGrid, GridColDef, GridRowId, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AnyItemType, Subscriber } from "../../types/DB";
import { ItemProps, ItemWithDataColumns } from "../../types/fnProps";
import hasProperty from "../../vars/hasProperty";

const FilterData = ({ item, itemProps, handleFormCompletion }: { item: object, itemProps: ItemWithDataColumns, handleFormCompletion: (data: object) => void }) => {

    const [dataItems, setDataItems] = useState<any[]>([]);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowId[]>([]);

    useEffect(() => {
        const tempField = itemProps.tempDestinationField;
        if (hasProperty(item, tempField)) {
            setRowSelectionModel((item[tempField] as any[]).map(({ id }) => id));
            setDataItems(item[tempField]);
        }
    }, [item, itemProps.tempDestinationField]);

    function filterer(model: GridRowSelectionModel) {
        setRowSelectionModel(model);
        const newDataItems = (hasProperty(item, itemProps.destinationCollectionField) ? (item[itemProps.destinationCollectionField] as any[]).filter(({ id }: { id: string }) => model.includes(id)) : []);
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
                        rows={hasProperty(item, itemProps.destinationCollectionField) ? item[itemProps.destinationCollectionField] : []}
                        columns={hasProperty(item, itemProps.sourceCollectionField) ? itemProps.dataFilterColumns[item[itemProps.sourceCollectionField]].filter(({ field }: GridColDef) => field !== 'select') : []}
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