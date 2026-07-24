import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { taskSchema, taskStatusSchema, } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithDataColumns, ItemWithFields, ItemWithNestedFields } from "../types/fnProps";
import { Status } from "../types/DB";
import userProps from "./userProps";
import { Timestamp } from "firebase/firestore";

const taskColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'deadline', headerName: 'Deadline', flex: 3 },
    {
        field: 'status', headerName: 'Status', flex: 4, valueGetter: (params) => {
            const latest = params.row.status.sort((entryA: Status, entryB: Status) => {
                if (entryA.datetime instanceof Timestamp && entryB.datetime instanceof Timestamp) {
                    return entryB.datetime.toDate().getMilliseconds() - entryA.datetime.toDate().getMilliseconds();
                }
                return entryB.datetime?.seconds - entryA.datetime?.seconds
            })[0];
            return latest.entry;
        }
    },
    {
        field: 'archived',
        headerName: 'Archived?',
        valueGetter: (params) => params.row.archived === 1 ? 'Yes' : 'No'
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/tasks/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const taskFields = {
    name: '',
    description: '',
    deadline: '',
    reminder: '',
    channelId: '',
    source: 'users'
};

const statusFields = {
    entry: '',
};

const taskFA = [
    { label: 'Name', id: 'name', required: true },
    { label: 'Description', id: 'description', multiline: true, type: 'rich-text', required: true },
    // { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events` },
    { label: 'Deadline', id: 'deadline', type: 'date' },
    { label: 'Reminder (Slack natural‑language time)', id: 'reminder', placeholder: 'tomorrow at 9am, in 2 hours, next Friday 3pm' },
    { label: 'Slack Channel ID', id: 'channelId', }
];

const statusFA = [
    { label: 'Entry', id: 'entry' },
];

// const fileFields = {
//     imageUrl: '',
//     program: '',
//     bannerHome: ''
// }

// const fileFA = [
//     { label: 'Image Url', id: 'imageUrl', type: 'file', path: `${collections.images}/events`, displayName: 'imgSrc' },
//     { label: 'Program book', id: 'program', type: 'file', path: 'pdfs/program-books', displayName: 'programBook' },
//     { label: 'Banner /1920*1080', id: 'bannerHome', type: 'file', path: `${collections.images}/banners/home`, displayName: 'eventBanner' }
// ]

const taskProps: ItemWithFields & ItemWithNestedFields & ItemWithDataColumns = {
    itemType: 'tasks',
    name: 'name',
    columns: taskColumns,
    sorting: { field: 'archived', sort: 'asc' },
    pageSize: 10,
    pageSizeOptions: [10, 20, 30],
    fields: taskFields,
    nestedFields: statusFields,
    fieldsArray: taskFA,
    nestedArray: statusFA,
    // filesFields: fileFields,
    // filesFieldsArray: fileFA,
    nestedName: 'status',
    dataFilterColumns: { users: userProps.columns },
    sourceCollectionField: 'source',
    destinationCollectionField: 'users',
    tempDestinationField: 'newUsers',
    // schematifyFn: schematifyEvent,
    // deschematifyFn: deschematifyEvent,
    steps: ['fieldsArray', 'nestedArray', 'dataFilter', 'preview'],
    // filesSchema: eventFileSchema,
    fieldsArraySchema: taskSchema,
    nestedArraySchema: taskStatusSchema
};

export default taskProps;