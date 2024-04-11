import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import schematifySubscriber from "../vars/schematifySubscriber";
import deschematifySubscriber from "../vars/deschematifySubscriber";
import SubscriberActionBox from "../components/Emails/SubscriberActionBox";

const subscriberColumns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
        field: 'status', 
        headerName: 'Status',
        flex: 2,
        valueGetter: (params) => params.row.status ? 'Subscribed' : 'Unsubscribed'
    },
    {
        field: 'tags',
        headerName: 'Tags',
        flex: 2,
        valueGetter: (params) => params.row.tags?.join(', '),
        // sortComparator: (v1, v2) => {
        //     const item1 = months.findIndex(item => item === v1.split(',')[0]);
        //     const item2 = months.findIndex(item => item === v2.split(',')[0]);
        //     return item1 - item2;
        // }
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/subscribers/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const historyColumns = [
    {
        field: 'event',
        headerName: 'Event',
        flex: 1
    },
    {
        field: 'subject',
        headerName: 'Campaign',
        flex: 2,
    },
    {
        field: 'timestamp',
        headerName: 'Timestamp',
        flex: 2,
        valueGetter: ({ row }) => row.timestamp.toDate()
    }
]

const subscriberFields = {
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    status: ''
    // performances: []
};

const tagsFields = {
    tag: '',
};

const subscribersFA = [
    { label: 'First name', id: 'firstName', },
    { label: 'Last name', id: 'lastName', },
    { label: 'Email', id: 'email' },
    { label: 'Status', id: 'status', type: 'select', options: ['Unsubscribed', 'Subscribed'] },
    { label: 'Location', id: 'location', },
];

const tagsFA = [
    {
        label: 'Tag',
        id: 'tag',
    }
]

const subscriberProps = {
    itemType: 'subscribers',
    name: 'email',
    actionBox: <SubscriberActionBox />,
    columns: subscriberColumns,
    historyColumns: historyColumns,
    sorting: { field: 'email', sort: 'asc' },
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    formType: 'dynamic',
    fields: subscriberFields,
    nestedFields: tagsFields,
    fieldsArray: subscribersFA,
    nestedArray: tagsFA,
    nestedName: 'tags',
    schematifyFn: schematifySubscriber,
    deschematifyFn: deschematifySubscriber
};

export default subscriberProps;