// import { TextSnippet } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { CSVSchema } from "../utils/yup/yup-schemas";

const CSVListColumns = [
    // { field: 'icon', headerName: 'Avatar', sortable: false, flex: 0 },
    { field: 'firstName', headerName: 'First name', flex: 2 },
    { field: 'lastName', headerName: 'Last name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 }
    // {
    //     field: 'select',
    //     headerName: 'Select',
    //     sortable: false,
    //     flex: 2,
    //     renderCell: (params) => (
    //         <Link to={`/texts/${params.id}`}>
    //             <Button variant="contained">
    //                 View
    //             </Button>
    //         </Link>
    //     )
    // }
];

const CSVColumns = [
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
    { label: 'CSV', id: 'csv', type: 'file', path: 'mock-email/csv' },
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
    fields: fields,
    fieldsArray: csvFA,
    encType: 'multipart/form-data',
    steps: ['fieldsArray', 'preview'],
    schemas: { fieldsArray: CSVSchema }
};

export default CSVProps;