
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CSVSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";

const CSVListColumns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', flex: 2 },
    { field: 'lastName', headerName: 'Last name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 }
];

const CSVColumns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 4 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/CSVs/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
]

const fields = {
    csv: '',
};

const csvFA = [
    { label: 'CSV', id: 'csv', type: 'file', path: 'CSVs', displayName: 'csvFile' },
];

const CSVProps = {
    itemType: 'CSVs',
    name: 'id',
    columns: CSVColumns,
    listColumns: CSVListColumns,
    sorting: { field: 'id', sort: 'asc' },
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    formType: 'file',
    filesFields: fields,
    filesFieldsArray: csvFA,
    encType: 'multipart/form-data',
    steps: ['files', 'preview'],
    schemas: { files: CSVSchema }
};

export default CSVProps;