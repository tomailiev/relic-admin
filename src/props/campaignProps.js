import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const campaignColumns = [
    { field: 'subject', headerName: 'Subject', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, valueGetter: ({row}) => row.status ? 'Draft' : 'Sent' },
    { field: 'datetime', headerName: 'Date', flex: 2, valueGetter: ({row}) => row.datetime.toDate() },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => {
            return params.row.status === 1
                ? <Link to={`/campaigns/${params.id}/edit`}>
                    <Button variant="contained">
                        Edit
                    </Button>
                </Link>
                : <Link to={`/campaigns/${params.id}`}>
                    <Button variant="contained">
                        View
                    </Button>
                </Link>
        }
    },
];

const campaignFields = {
    subject: '',
    previewText: '',
    to: '',
    from: '',
};


const campaignsFA = [
    { label: 'Subject', id: 'subject', },
    { label: 'Preview text', id: 'previewText', },
    { label: 'To', id: 'to', type: 'select', options: ['All', 'Tags...'] },
    { label: 'From', id: 'from', type: 'select', options: ['info@relicensemble.org', 'relic@relicensemble.org'] },
];

const campaignProps = {
    itemType: 'campaigns',
    name: 'subject',
    columns: campaignColumns,
    sorting: { field: 'datetime', sort: 'asc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    formType: 'dynamic',
    fields: campaignFields,
    fieldsArray: campaignsFA,
};

export default campaignProps;