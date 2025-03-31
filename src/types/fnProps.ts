import { GridColDef, GridSortItem } from "@mui/x-data-grid"
import { ReactElement } from "react"
import { Schema } from "yup"
import { AnyItemType, ItemTypeMap } from "./DB"

export interface FieldsArrayItem {
    label: string,
    id: string,
    type?: string,
    options?: { value: string | number, label?: string, type?: string, display?: string }[],
    multiline?: boolean,
}

export interface FileFieldsArrayItem extends FieldsArrayItem {
    path: string,
    displayName: string
}

export interface ItemProps {
    itemType: keyof ItemTypeMap,
    name: string,
    columns: GridColDef[],
    sorting: GridSortItem,
    pageSize: number,
    pageSizeOptions: [number, number, number],
    steps: ('initialFieldsArray' | 'fieldsArray' | 'dataFilter' | 'preview' | 'nestedArray' | 'files')[],
    // schemas: Partial<Record<'initialFieldsArray' | 'fieldsArray' | 'dataFilter' | 'preview' | 'nestedArray' | 'files', Schema>>,
    editSteps?: ('initialFieldsArray' | 'fieldsArray' | 'dataFilter' | 'preview' | 'nestedArray' | 'files')[],
    actionBox?: ReactElement
    schematifyFn?: (item: any) => {},
    deschematifyFn?: (item: any) => {},
    item?: AnyItemType,
    specialColumns?: GridColDef[]
};

export interface ItemWithFields extends ItemProps {
    fieldsArray: FieldsArrayItem[],
    fields: object,
    fieldsArraySchema: Schema
}

export interface ItemWithNestedFields extends ItemProps {
    nestedFields: object,
    nestedArray: FieldsArrayItem[],
    nestedName: string,
    nestedArraySchema: Schema
}

export interface ItemWithFileFields extends ItemProps {
    filesFields: object,
    filesFieldsArray: FileFieldsArrayItem[],
    filesSchema: Schema
}

export interface ItemWithInitialFields extends ItemProps {
    initialFieldsArray: FieldsArrayItem[],
    initialFields: object,
    initialFn: (item?: any) => {},
    initialFieldsArraySchema: Schema
}

export interface ItemWithDataColumns extends ItemProps {
    dataFilterColumns: { [key: string]: GridColDef[] },
    sourceCollectionField: string,
    destinationCollectionField: string,
    tempDestinationField: string,
}

export type ItemWithAllProps = ItemWithFields & ItemWithInitialFields & ItemWithFileFields & ItemWithNestedFields & ItemWithDataColumns;