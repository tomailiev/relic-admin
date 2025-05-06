import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { listSchema, } from "../utils/yup/yup-schemas";
import listSourceLoader from "../loaders/listSourceLoader";
import donorProps from "./donorProps";
import subscriberProps from "./subscriberProps";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithDataColumns, ItemWithInitialFields } from "../types/fnProps";

const listColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 1,
        renderCell: (params) => {
            return <Avatar alt={params.row?.source} >{params.row?.source === 'donors' ? 'D' : 'S'}</Avatar>
        }
    },
    { field: 'name', headerName: 'Name', flex: 3 },
    { field: 'source', headerName: 'Source', flex: 1 },
    { field: 'datetime', headerName: 'Date', flex: 1, valueGetter: ({ row }) => row.datetime?.toDate().toLocaleString() },
    {
        field: 'members', headerName: 'Members #', flex: 1, valueGetter: ({ row }) => {
            return row.members?.length || 0
        }
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <Link to={`/lists/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const initialListFieldsArray = [
    { label: 'Name', id: 'name' },
    { label: 'Source', id: 'source', type: 'select', options: [{ value: 'donors' }, { value: 'subscribers' }] }
]

const initialFields = {
    name: '',
    source: 'subscribers'
}

const listProps: ItemWithDataColumns & ItemWithInitialFields = {
    itemType: 'lists',
    name: 'name',
    columns: listColumns,
    sorting: { field: 'dateTime', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    dataFilterColumns: { donors: donorProps.columns, subscribers: subscriberProps.columns },
    initialFieldsArray: initialListFieldsArray,
    initialFields: initialFields,
    steps: ['initialFieldsArray', 'dataFilter', 'preview'],
    sourceCollectionField: 'source',
    destinationCollectionField: 'members',
    tempDestinationField: 'newMembers',
    initialFieldsArraySchema: listSchema,
    initialFn: listSourceLoader
};

export default listProps;