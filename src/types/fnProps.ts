import { GridColDef, GridSortingInitialState, GridSortItem, GridSortModel } from "@mui/x-data-grid"
import { ReactElement } from "react"

export interface FieldsArrayItem {
    label: string,
    id: string,
    type?: string,
    options?: { value: string | number, label?: string }[],
    multiline?: boolean
}

export interface ItemProps {
    itemType: string,
    name: string,
    columns: GridColDef[],
    sorting: GridSortItem,
    pageSize: number,
    pageSizeOptions: [number, number, number],
    steps: ('initialFieldsArray' | 'fieldsArray' | 'dataFilter' | 'preview' | 'nestedArray' | 'files')[],
    schemas: object,
    dataFilterColumns?: object,
    initialFieldsArray?: FieldsArrayItem[],
    initialFields?: object,
    fieldsArray?: FieldsArrayItem[],
    fields?: object,
    nestedFields?: object,
    nestedArray?: FieldsArrayItem[],
    nestedName?: string,
    filesFields?: object,
    filesFieldsArray?: FieldsArrayItem[],
    editSteps? : ('initialFieldsArray' | 'fieldsArray' | 'dataFilter' | 'preview' | 'nestedArray' | 'files')[],
    sourceCollectionField?: string,
    destinationCollectionField?: string,
    tempDestinationField?: string,
    actionBox?: ReactElement
    initialFn?: () => {},
}