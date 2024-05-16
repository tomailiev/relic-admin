import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { clickReducer, openReducer } from "./campaignStatProps";

const campaignColumns = [
    { field: 'subject', headerName: 'Subject', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1, valueGetter: ({ row }) => row.status ? 'Draft' : 'Sent' },
    { field: 'datetime', headerName: 'Date', flex: 1, valueGetter: ({ row }) => row.datetime.toDate() },
    {
        field: 'edit',
        headerName: 'Edit/Stats',
        sortable: false,
        flex: 2,
        renderCell: ({row, id}) => {
            return row.status === 1 ? (
                <Link to={`/campaigns/${id}/edit`}>
                    <Button variant="contained">
                        Edit
                    </Button>
                </Link>
            )
            : `Open: ${(row.open?.reduce(openReducer, []).length / row.sentTo?.length * 100).toFixed(1) || 0}%,
            Click: ${(row.click?.reduce(clickReducer, []).length / row.sentTo?.length * 100).toFixed(1) || 0}%`
        }
    },
    {
        field: 'details',
        headerName: 'Details',
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            return (
                <Link to={`/campaigns/${params.id}`}>
                    <Button variant="contained">
                        {params.row.status === 1 ? 'View' : 'Report'}
                    </Button>
                </Link>
            )
        }
    },
];

const campaignFields = {
    subject: '',
    to: '',
    from: '',
};


const campaignsFA = [
    { label: 'Subject', id: 'subject', },
    { label: 'To', id: 'to', type: 'select', options: ['All subscribers'] },
    { label: 'From', id: 'from', type: 'select', options: ['info@relicensemble.org', 'relic@relicensemble.org'] },
];

const campaignProps = {
    itemType: 'campaigns',
    name: 'subject',
    columns: campaignColumns,
    sorting: { field: 'datetime', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    formType: 'simple',
    fields: campaignFields,
    fieldsArray: campaignsFA,
};

export default campaignProps;