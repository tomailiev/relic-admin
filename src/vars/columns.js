import { TextSnippet } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
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

const eventColumns = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.name} />
        }
    },
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 4 },
    {
        field: 'season', headerName: 'Season', flex: 1, valueGetter: (params) => {
            const date = params.row.dateDone.toDate();
            const month = date.getUTCMonth();
            const year = date.getUTCFullYear();
            return month >= 7 ? year - 2021 : year - 2022
        }
    },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/events/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const musicianColumns = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.name} />
        }
    },
    // { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'newTitle', headerName: 'Instrument', flex: 4 },
    { field: 'featured', headerName: 'Season', flex: 1 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/musicians/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const textColumns = [
    { field: 'icon', headerName: 'Avatar', sortable: false, flex: 0, renderCell: () => <TextSnippet /> },
    { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'value', headerName: 'Value', flex: 4 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/texts/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const videoColumns = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={params.row?.thumbnail} alt={params.row?.title} />
        }
    },
    // { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'title', headerName: 'Title', flex: 4 },
    { field: 'featured', headerName: 'Priority', flex: 1 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/videos/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

export { donorColumns, eventColumns, musicianColumns, textColumns, videoColumns };