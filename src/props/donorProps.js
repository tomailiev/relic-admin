import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const getTier = (amount) => {
    return amount < 50
        ? ''
        : amount >= 50 && amount < 200
            ? 'Muse $50+'
            : amount >= 200 && amount < 500
                ? 'Dionysus $200+'
                : amount >= 500 && amount < 1000
                    ? 'Artemis $500+'
                    : amount >= 1000 && amount < 2500
                        ? 'Hermes $1000+'
                        : amount >= 2500 && amount < 7500
                            ? 'Athena $2500+'
                            : amount >= 7500 && amount < 15000
                                ? 'Apollo $7500+'
                                : 'Zeus & Hera $15,000+'
};

const today = new Date();
const isYearEnd = (today.getUTCMonth()) > 5;
const startDate = isYearEnd
    ? new Date(`07-01-${today.getUTCFullYear()}`)
    : new Date(`07-01-${today.getUTCFullYear() - 1}`);

const endDate = isYearEnd
    ? new Date(`06-30-${today.getUTCFullYear() + 1}`)
    : new Date(`06-30-${today.getUTCFullYear()}`);

const donorColumns = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1.5 },
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
        field: 'yearEndStatus',
        headerName: 'Current status',
        valueGetter: ({ row }) => getTier(row.donations
            .filter(donation => new Date(donation.date) >= startDate && new Date(donation.date <= endDate))
            .reduce((a, c) => a + c.amount, 0)),
        flex: 2
    },
    {
        field: 'lastRecognitionName',
        headerName: 'Recognition',
        valueGetter: ({ row }) => `${row.donations[row.donations.length - 1].recognitionName}`,
        flex: 2
    },
    // {
    //     field: 'type',
    //     headerName: 'Type',
    //     valueGetter: ({ row }) => {
    //         return Array.from(row.donations?.reduce((acc, curr) => {
    //             acc.add(curr.campaign);
    //             return acc;
    //         }, new Set())).join(', ');
    //     },
    //     flex: 1.5
    // },
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
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    formType: 'simple',
    fields: donorFields,
    nestedFields: donationFields,
    fieldsArray: donorFA,
    nestedArray: donationFA,
    nestedName: 'donations',
};

export default donorProps;