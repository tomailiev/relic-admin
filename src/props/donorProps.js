import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const donorColumns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1.5 },
    {
        field: 'lastDonationDate',
        headerName: 'Last $ date',
        flex: 1
    },
    {
        field: 'lastDonationAmount',
        headerName: 'Last $ amount',
        valueFormatter: (params) => `$${params.value}`,
        flex: 1,
        sortComparator: (v1, v2) => v1 - v2,
    },
    {
        field: 'totalDonationsAmount',
        headerName: 'Total $ amount',
        valueGetter: ({ row }) => `$${row.donations?.reduce((acc, curr) => acc + curr.amount, 0)}`,
        flex: 1,
        sortComparator: (v1, v2) => Number(v1.substring(1)) - Number(v2.substring(1)),
    },
    {
        field: 'type',
        headerName: 'Type',
        valueGetter: ({ row }) => {
            return Array.from(row.donations?.reduce((acc, curr) => {
                acc.add(curr.campaign);
                return acc;
            }, new Set())).join(', ');
        },
        flex: 1.5
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
    { label: 'Campaign', id: 'campaign', type: 'select', options: ['online', 'check', 'GoFundMe 2022'] },
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
    pageSize: 25,
    pageSizeOptions: [25, 50, 100],
    formType: 'simple', 
    fields: donorFields,
    nestedFields: donationFields,
    fieldsArray: donorFA,
    nestedArray: donationFA,
    nestedName: 'donations',
};

export default donorProps;