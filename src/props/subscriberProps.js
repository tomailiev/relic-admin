import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import schematifySubscriber from "../vars/schematifySubscriber";
import deschematifySubscriber from "../vars/deschematifySubscriber";
import SubscriberActionBox from "../components/Subscribers/SubscriberActionBox";
import { subscriberSchema, tagsSchema } from "../utils/yup/yup-schemas";

const subscriberColumns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        valueGetter: (params) => params.row.status ? 'Subscribed' : 'Unsubscribed'
    },
    {
        field: 'opt_in_time',
        headerName: 'Subscriber since',
        flex: 2
    },
    {
        field: 'tags',
        headerName: 'Tags',
        flex: 1,
        valueGetter: (params) => params.row.tags?.join(', '),
    },
    {
        field: 'location',
        headerName: 'Location',
        flex: 2
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
        renderCell: (params) => (
            <Link to={encodeURI(`/campaigns/?subject=${params.value}`)} >
                {params.value}
            </Link>
        )
    },
    {
        field: 'timestamp',
        headerName: 'Timestamp',
        flex: 2,
        valueGetter: ({ row }) => row.timestamp
    }
]

const subscriberFields = {
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    status: ''
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
    sorting: { field: 'opt_in_time', sort: 'desc' },
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    formType: 'dynamic',
    fields: subscriberFields,
    nestedFields: tagsFields,
    fieldsArray: subscribersFA,
    nestedArray: tagsFA,
    nestedName: 'tags',
    schematifyFn: schematifySubscriber,
    deschematifyFn: deschematifySubscriber,
    blankObject: { ...subscriberFields, tags: [tagsFields] },
    steps: ['fieldsArray', 'nestedArray', 'preview'],
    schemas: { fieldsArray: subscriberSchema, nestedArray: tagsSchema }
};

export default subscriberProps;