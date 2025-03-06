import { Button } from "@mui/material";
import deschematifyGrant from "../vars/deschematifyGrant";
import schematifyGrant from "../vars/schematifyGrant";
import { Check, Close, OpenInNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { dueMonthsSchema, grantSchema } from "../utils/yup/yup-schemas";
import { months } from "../vars/dateObjects";
import { GridColDef } from "@mui/x-data-grid";

const grantColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2 },
    {
        field: 'link', headerName: 'Url', flex: 1, renderCell: (params) => (
            <Button
                href={params.row.link}
                startIcon={<OpenInNew />}
                target="_blank"
                referrerPolicy="no-referrer"
                sx={{ textTransform: 'capitalize' }} >
                Link
            </Button>)
    },
    { field: 'description', headerName: 'Description', flex: 4 },
    {
        field: 'dueMonths',
        headerName: 'Due months',
        flex: 2,
        valueGetter: (params) => params.row.dueMonths.sort((a: number, b: number) => a - b).map((m: number) => months[m]).join(', '),
        sortComparator: (v1, v2) => {
            const item1 = months.findIndex(item => item === v1.split(',')[0]);
            const item2 = months.findIndex(item => item === v2.split(',')[0]);
            return item1 - item2;
        }
    },
    {
        field: 'notification',
        headerName: 'Notification',
        flex: 1,
        renderCell: (params) => params.row.notification ? <Check /> : <Close />
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/grants/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

/*
name
dateApplied
amountApplied
awarded ?
dateAwarded
amountAwarded
website
materialsLocation
*/

const grantFields = {
    name: '',
    link: '',
    notification: '',
    description: ''
};

const monthsFields = {
    dueMonth: '',
};

const grantsFA = [
    { label: 'Name', id: 'name', },
    { label: 'Url', id: 'link' },
    { label: 'Notification', id: 'notification', type: 'select', options: [{ value: 'No' }, { value: 'Yes' }] },
    { label: 'Description', id: 'description', multiline: true },
];

const monthsFA = [
    {
        label: 'Month',
        id: 'dueMonth',
        type: 'select',
        options: months.map(m => ({ value: m }))
    }
]

const grantProps = {
    itemType: 'grants',
    name: 'name',
    columns: grantColumns,
    sorting: { field: 'name', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [10, 20, 30],
    formType: 'dynamic',
    fields: grantFields,
    nestedFields: monthsFields,
    fieldsArray: grantsFA,
    nestedArray: monthsFA,
    nestedName: 'dueMonths',
    schematifyFn: schematifyGrant,
    deschematifyFn: deschematifyGrant,
    encType: 'application/json',
    steps: ['fieldsArray', 'nestedArray', 'preview'],
    schemas: { fieldsArray: grantSchema, nestedArray: dueMonthsSchema }
};

export default grantProps;