import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { logSchema, } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithDataColumns, ItemWithFields } from "../types/fnProps";
import taskProps from "./taskProps";
import { Task } from "../types/DB";

const logColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 2 },
    { field: 'hours', headerName: 'Number of Hours', flex: 1 },
    {
        field: 'tasks', headerName: 'Tasks', flex: 2, valueGetter: (params) => {
            return params.row.tasks
                ? params.row.tasks.map((task: Task) => task.name).join(' | ')
                : params.row.description
                    ? params.row.description
                    : params.row.category
        }
    },
    { field: 'userName', headerName: 'User Name', flex: 2 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/logs/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const fields = {
    date: '',
    hours: '',
    description: '',
    source: 'tasks'
};

const logFA = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Number of Hours', id: 'hours', type: 'number' },
    { label: 'Description', id: 'description' }
];

const logProps: ItemWithFields & ItemWithDataColumns = {
    itemType: 'logs',
    name: 'id',
    columns: logColumns,
    sorting: { field: 'date', sort: 'desc' },
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    fields: fields,
    fieldsArray: logFA,
    steps: ['fieldsArray', 'dataFilter', 'preview'],
    fieldsArraySchema: logSchema,
    sourceCollectionField: 'source',
    destinationCollectionField: 'tasks',
    tempDestinationField: 'newTasks',
    dataFilterColumns: { tasks: taskProps.columns }
};

export default logProps;