import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { logSchema, } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithFields } from "../types/fnProps";

const logColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 2 },
    { field: 'hours', headerName: 'Number of Hours', flex: 2 },
    { field: 'category', headerName: 'Category', flex: 2 },
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
    category: '',
};

const logFA = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Number of Hours', id: 'hours', type: 'number' },
    { label: 'Category', id: 'category' }
];

const logProps: ItemWithFields = {
    itemType: 'logs',
    name: 'id',
    columns: logColumns,
    sorting: { field: 'date', sort: 'desc' },
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    fields: fields,
    fieldsArray: logFA,
    steps: ['fieldsArray', 'preview'],
    fieldsArraySchema: logSchema
};

export default logProps;