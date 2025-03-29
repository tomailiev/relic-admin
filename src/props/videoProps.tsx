import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { initialVideoSchema, videoSchema } from "../utils/yup/yup-schemas";
import { getVideoInfo } from "../utils/firebase/firebase-functions";
import { GridColDef } from "@mui/x-data-grid";
import { ItemProps, ItemWithFields, ItemWithInitialFields } from "../types/fnProps";

const videoColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 1,
        renderCell: (params) => {
            return <Avatar src={params.row?.thumbnail} alt={params.row?.title} />
        }
    },
    { field: 'title', headerName: 'Title', flex: 5 },
    { field: 'featured', headerName: 'Priority', flex: 1 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <Link to={`/videos/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const initialVideoFA = [
    { label: 'YouTube link', id: 'url' },
]

const videoFA = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
    { label: 'Program', id: 'program', type: 'select', options: [{ value: 'Autumn Rising' }, { value: 'Winter Oasis' }, { value: 'Enchanted Forest' }, { value: 'At the Temple of Juno' }, { value: 'Into the Underworld' }, { value: 'The Dawn of Time' }] },
    { label: 'Category', id: 'category', type: 'select', options: [{ value: 'full concert' }, { value: 'live' }, { value: 'studio' }] }
];

const fields = {
    featured: '',
    title: '',
    youtubeId: '',
    thumbnail: '',
    program: '',
    category: ''
}

const initialFields = {
    url: '',
}

const videoProps: ItemWithFields & ItemWithInitialFields = {
    itemType: 'videos',
    name: 'youtubeId',
    columns: videoColumns,
    sorting: { field: 'featured', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    fields: fields,
    fieldsArray: videoFA,
    initialFieldsArray: initialVideoFA,
    initialFields: initialFields,
    steps: ['initialFieldsArray', 'fieldsArray', 'preview'],
    editSteps: ['fieldsArray', 'preview'],
    initialFieldsArraySchema: initialVideoSchema,
    fieldsArraySchema: videoSchema,
    initialFn: getVideoInfo
};

export default videoProps;