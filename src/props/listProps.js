import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { initialVideoSchema, listSchema, videoSchema } from "../utils/yup/yup-schemas";
import { getVideoInfo } from "../utils/firebase/firebase-functions";
import listSourceLoader from "../loaders/listSourceLoader";
import donorProps from "./donorProps";
import subscriberProps from "./subscriberProps";

const listColumns = [
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
    { field: 'datetime', headerName: 'Date', flex: 1 },
    {
        field: 'members', headerName: 'Members #', flex: 1, valueGetter: ({ row }) => {
            return row.members?.count || 0
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
    { label: 'Source', id: 'source', type: 'select', options: ['donors', 'subscribers'] }
]

// const videoFA = [
//     { label: 'Featured priority', id: 'featured', type: 'number' },
//     { label: 'Title', id: 'title' },
//     { label: 'YouTube Id', id: 'youtubeId' },
//     { label: 'Thumbail Url', id: 'thumbnail' },
//     { label: 'Program', id: 'program', type: 'select', options: ['Autumn Rising', 'Winter Oasis', 'Enchanted Forest', 'At the Temple of Juno', 'Into the Underworld', 'The Dawn of Time'] },
//     { label: 'Category', id: 'category', type: 'select', options: ['full concert', 'live', 'studio'] }
// ];

// const fields = {
//     featured: '',
//     title: '',
//     youtubeId: '',
//     thumbnail: '',
//     program: '',
//     category: ''
// }

const initialFields = {
    name: '',
    source: 'subscribers'
}

const listProps = {
    itemType: 'lists',
    name: 'name',
    columns: listColumns,
    sorting: { field: 'dateTime', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    // fields: fields,
    // fieldsArray: videoFA,
    dataFilterColumns: { donors: donorProps.columns, subscribers: subscriberProps.columns },
    initialFieldsArray: initialListFieldsArray,
    initialFields: initialFields,
    formType: 'simple',
    encType: 'application/json',
    steps: ['initialFieldsArray', 'dataFilter', 'preview'],
    sourceCollectionField: 'source',
    destinationCollectionField: 'members',
    // editSteps: ['fieldsArray', 'preview'],
    schemas: { initialFieldsArray: listSchema, },
    initialFn: listSourceLoader
};

export default listProps;