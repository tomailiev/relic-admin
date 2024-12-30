import { Avatar, Button } from "@mui/material";
import { deschematifyEvent } from "../vars/deschematifyEvent";
import schematifyEvent from "../vars/schematifyEvent";
import { Link } from "react-router-dom";
import collections from "../vars/collections";
import { eventFileSchema, eventSchema, performanceSchema } from "../utils/yup/yup-schemas";

const eventColumns = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.name} />
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
};

const eventFA = [
    { label: 'Date done', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description', multiline: true },
    // { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events` },
    { label: 'Title', id: 'title' },
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
];

const eventProps = {
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
    filesFields: { imageUrl: '' },
    filesFieldsArray: [{ label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events`, displayName: 'imgSrc' }],
    nestedName: 'performances',
    schematifyFn: schematifyEvent,
    deschematifyFn: deschematifyEvent,
    formType: 'dynamic',
    encType: 'application/json',
    steps: ['files', 'fieldsArray', 'nestedArray', 'preview'],
    schemas: { files: eventFileSchema, fieldsArray: eventSchema, nestedArray: performanceSchema }
};

export default eventProps;