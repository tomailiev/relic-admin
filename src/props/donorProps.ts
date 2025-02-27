import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { donationSchema, donorSchema } from "../utils/yup/yup-schemas";
import { getTier } from "../vars/getTier";
import { reduceDonations } from "../vars/reduceDonations";
import { oneYearAgoFromToday, twoYearsAgoFromTomorrow } from "../vars/dateObjects";


function numExtractor(str = '') {
    return Number(Array.from(str).filter(char => char >= '0' && char <= '9').join(''));
}

function tierComparator(tierStr1, tierStr2) {
    return numExtractor(tierStr1) - numExtractor(tierStr2);
}

const donorColumns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    // { field: 'address', headerName: 'Address', flex: 1.5 },
    { field: 'location', headerName: 'Location', flex: 1.5 },
    {
        field: 'lastDonationDate',
        headerName: 'Last $ date',
        flex: 1
    },
    {
        field: 'YtDAmount',
        headerName: 'YtD amount',
        valueGetter: ({ row }) => `$${reduceDonations(row.donations)}`,
        flex: 1,
        sortComparator: (v1, v2) => Number(v1.substring(1)) - Number(v2.substring(1)),
    },
    {
        field: 'LastYtDAmount',
        headerName: 'Last YtD amount',
        valueGetter: ({ row }) => `$${reduceDonations(row.donations, twoYearsAgoFromTomorrow, oneYearAgoFromToday)}`,
        flex: 1,
        sortComparator: (v1, v2) => Number(v1.substring(1)) - Number(v2.substring(1)),
    },
    {
        field: 'totalDonationsAmount',
        headerName: 'Total $ amount',
        valueGetter: ({ row }) => `$${row.donations?.reduce((acc, curr) => acc + curr.amount, 0)}`,
        flex: 1,
        sortComparator: (v1, v2) => Number(v1.substring(1)) - Number(v2.substring(1)),
    },
    {
        field: 'yearEndStatus',
        headerName: 'Tier',
        valueGetter: ({ row }) => getTier(reduceDonations(row.donations)),
        flex: 1.5,
        sortComparator: tierComparator
    },
    {
        field: 'lastRecognitionName',
        headerName: 'Recognition',
        valueGetter: ({ row }) => `${row.donations[row.donations.length - 1].recognitionName}`,
        flex: 2
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <Link to={`/donors/${params.id}`}>
                <Button variant="contained" disabled={params.row.error}>
                    View
                </Button>
            </Link>
        )
    }
];

const donorFA = [
    { label: 'First name', id: 'firstName' },
    { label: 'Last name', id: 'lastName' },
    { label: 'Email', id: 'email' },
    { label: 'Address', id: 'address' },
    { label: 'Location', id: 'location' },
    { label: 'Phone #', id: 'phone' },
];

const donationFA = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Amount', id: 'amount' },
    { label: 'Campaign', id: 'campaign', type: 'select', options: [{ value: 'online' }, { value: 'check' }, { value: 'GoFundMe 2022' }] },
    { label: 'Recognition name', id: 'recognitionName' },
    { label: 'Comment', id: 'comment' }
];

const donorFields = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    location: '',
    phone: ''
};

const donationFields = {
    date: '',
    amount: '',
    campaign: '',
    recognitionName: '',
    comment: ''
};

const donorProps = {
    itemType: 'donors',
    columns: donorColumns,
    sorting: { field: 'lastDonationDate', sort: 'desc' },
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    formType: 'simple',
    fields: donorFields,
    nestedFields: donationFields,
    fieldsArray: donorFA,
    nestedArray: donationFA,
    nestedName: 'donations',
    steps: ['fieldsArray', 'nestedArray', 'preview'],
    schemas: { fieldsArray: donorSchema, nestedArray: donationSchema }
};

export default donorProps;