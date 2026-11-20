import { Avatar, Button } from "@mui/material";
import { deschematifyEvent } from "../vars/deschematifyEvent";
import schematifyEvent from "../vars/schematifyEvent";
import { Link } from "react-router-dom";
import collections from "../vars/collections";
import { eventFileSchema, eventSchema, performanceSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithDataColumns, ItemWithFields, ItemWithFileFields, ItemWithNestedFields } from "../types/fnProps";
import musicianProps from "./musicianProps";

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
    intro: '',
    source: 'musicians'
};

const performanceFields = {
    date: '',
    time: '',
    id: '',
    location: '',
    url: '',
    venue: '',
    // lat: '',
    // lng: '',
    presenter: '',
    caption: '',
};

const eventFA = [
    { label: 'Date done', id: 'dateDone', type: 'date', required: true },
    { label: 'Description', id: 'description', multiline: true, required: true, placeholder: 'Long blurb...' },
    // { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events` },
    { label: 'Title', id: 'title', required: true, placeholder: 'e.g. The Odyssey' },
    { label: 'Music', id: 'music', placeholder: 'e.g. Handel, Bach, Vivaldi' },
    { label: 'Subtitle', id: 'subtitle', required: true, placeholder: 'e.g. New York and DC' },
    { label: 'Intro', id: 'intro', placeholder: 'Short blurb' }
];

const performanceFA = [
    { label: 'Date', id: 'date', type: 'date', required: true },
    { label: 'Time', id: 'time', type: 'time', required: true },
    { label: 'Order #', id: 'id', required: true, placeholder: 'Performance order' },
    { label: 'Venue', id: 'venue', required: true },
    { label: 'City & State', id: 'location', required: true },
    { label: 'Url', id: 'url', placeholder: 'Tickets url' },
    // { label: 'Latitude', id: 'lat', },
    // { label: 'Longitude', id: 'lng', },
    { label: 'Presenter', id: 'presenter' },
    { label: 'Caption', id: 'caption' }
];

const fileFields = {
    imageUrl: '',
    program: '',
    bannerHome: ''
}

const fileFA = [
    { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events`, displayName: 'imgSrc', required: true },
    { label: 'Banner /1920*1080', id: 'bannerHome', type: 'file', path: `${collections.images}/banners/home`, displayName: 'eventBanner', required: true },
    { label: 'Program book', id: 'program', type: 'file', path: 'pdfs/program-books', displayName: 'programBook' },
]

const eventProps: ItemWithFields & ItemWithFileFields & ItemWithNestedFields & ItemWithDataColumns = {
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
    dataFilterColumns: { musicians: musicianProps.columns },
    sourceCollectionField: 'source',
    destinationCollectionField: 'musicians',
    tempDestinationField: 'newMusicians',
    schematifyFn: schematifyEvent,
    deschematifyFn: deschematifyEvent,
    steps: ['files', 'fieldsArray', 'nestedArray', 'dataFilter', 'preview'],
    filesSchema: eventFileSchema,
    fieldsArraySchema: eventSchema,
    nestedArraySchema: performanceSchema
};

export default eventProps;