import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { initialVideoSchema, videoSchema } from "../utils/yup/yup-schemas";

const videoColumns = [
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
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'YouTube link', id: 'youtubeLink' },
]

const videoFA = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
];

const fields = {
    featured: '',
    youtubeLink: '',
}

const videoProps = {
    itemType: 'videos',
    name: 'youtubeId',
    columns: videoColumns,
    sorting: { field: 'featured', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    fields: fields,
    fieldsArray: videoFA,
    initialFieldsArray: initialVideoFA,
    formType: 'simple',
    encType: 'application/json',
    steps: ['initialFieldsArray', 'fieldsArray', 'preview'],
    schemas: { initialFieldsArray: initialVideoSchema, fieldsArray: videoSchema }
};

export default videoProps;