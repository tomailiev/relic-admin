import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const templateColumns = [
    { field: 'subject', headerName: 'Subject', flex: 2 },
    { field: 'datetime', headerName: 'Date', flex: 1, valueGetter: ({ row }) => row.datetime?.toDate() },
    {
        field: 'details',
        headerName: 'Details',
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            return (
                <Link to={`/templates/${params.id}`}>
                    <Button variant="contained">
                        View
                    </Button>
                </Link>
            )
        }
    },
];

const templateFields = {
    subject: '',
};


const templateFA = [
    { label: 'Subject', id: 'subject', },
];

const templateProps = {
    itemType: 'templates',
    name: 'subject',
    columns: templateColumns,
    sorting: { field: 'datetime', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    formType: 'simple',
    fields: templateFields,
    fieldsArray: templateFA,
};

export default templateProps;