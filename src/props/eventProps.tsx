import { Avatar, Button } from "@mui/material";
import { deschematifyEvent } from "../vars/deschematifyEvent";
import schematifyEvent from "../vars/schematifyEvent";
import { Link } from "react-router-dom";
import collections from "../vars/collections";
import { eventFileSchema, eventSchema, performanceSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithFields, ItemWithFileFields, ItemWithNestedFields } from "../types/fnProps";

const eventColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.row?.name} />
        }
    },
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 4 },
    {
        field: 'season', headerName: 'Season', flex: 1, valueGetter: (params) => {
            const date = params.row.dateDone.toDate();
            const month = date.getUTCMonth();
            const year = date.getUTCFullYear();
            return month >= 7 ? year - 2021 : year - 2022
        }
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/events/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const eventFields = {
    dateDone: '',
    description: '',
    // imageUrl: '',
    title: '',
    // performances: []
    music: '',
    subtitle: '',
    intro: ''
};

const performanceFields = {
    date: '',
    time: '',
    id: '',
    location: '',
    url: '',
    venue: '',
    lat: '',
    lng: '',
    presenter: '',
    caption: ''
};

const eventFA = [
    { label: 'Date done', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description', multiline: true },
    // { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events` },
    { label: 'Title', id: 'title' },
    { label: 'Music', id: 'music' },
    { label: 'Subtitle', id: 'subtitle' },
    { label: 'Intro', id: 'intro' }
];

const performanceFA = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Time', id: 'time', type: 'time' },
    { label: 'Order #', id: 'id', },
    { label: 'City & State', id: 'location' },
    { label: 'Url', id: 'url' },
    { label: 'Venue', id: 'venue' },
    { label: 'Latitude', id: 'lat', },
    { label: 'Longitude', id: 'lng', },
    { label: 'Presenter', id: 'presenter' },
    { label: 'Caption', id: 'caption' }
];

const fileFields = {
    imageUrl: '',
    program: '',
    banner: ''
}

const fileFA = [
    { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events`, displayName: 'imgSrc' },
    { label: 'Program book', id: 'program', type: 'file', path: 'pdfs/program-books', displayName: 'programBook' },
    { label: 'Banner', id: 'banner', type: 'file', path: `${collections.images}/banners`, displayName: 'eventBanner' }
]

const eventProps: ItemWithFields & ItemWithFileFields & ItemWithNestedFields = {
    itemType: 'events',
    name: 'title',
    columns: eventColumns,
    sorting: { field: 'season', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [10, 20, 30],
    fields: eventFields,
    nestedFields: performanceFields,
    fieldsArray: eventFA,
    nestedArray: performanceFA,
    filesFields: fileFields,
    filesFieldsArray: fileFA,
    nestedName: 'performances',
    schematifyFn: schematifyEvent,
    deschematifyFn: deschematifyEvent,
    steps: ['files', 'fieldsArray', 'nestedArray', 'preview'],
    filesSchema: eventFileSchema,
    fieldsArraySchema: eventSchema,
    nestedArraySchema: performanceSchema
};

export default eventProps;