import { Link } from "react-router-dom";
import { Link as ExternalLink } from '@mui/material';
import { Check } from "@mui/icons-material";

export const multiColumns = [
    {
        field: 'email',
        headerName: 'Email address',
        flex: 2,
        renderCell: (params) => {
            return (
                <Link to={`/subscribers/${params.row.email}`}>
                    {params.row.email}
                </Link>
            )
        }
    },
    {
        field: 'timestamp',
        headerName: 'Timestamp',
        flex: 2,
        valueGetter: ({ row }) => row.timestamp.toDate()
    }
];

export const clickColumns = [
    {
        field: 'email',
        headerName: 'Email address',
        flex: 2,
        renderCell: (params) => {
            return (
                <Link to={`/subscribers/${params.row.email}`}>
                    {params.row.email}
                </Link>
            )
        }
    },
    {
        field: 'link',
        headerName: 'Url',
        flex: 2,
        renderCell: (params) => {
            return (
                <ExternalLink href={params.row.link} target={'_blank'}>
                    {params.row.link}
                </ExternalLink>
            )
        }
    },
    {
        field: 'timestamp',
        headerName: 'Timestamp',
        flex: 2,
        valueGetter: ({ row }) => row.timestamp.toDate()
    }
];

export const fullColumns = [
    {
        field: 'email',
        headerName: 'Email address',
        flex: 2,
        renderCell: (params) => {
            return (
                <Link to={`/subscribers/${params.row.email}`}>
                    {params.row.email}
                </Link>
            )
        }
    },
    {
        field: 'delivered',
        headerName: 'Delivered',
        flex: 1,
        renderCell: (params) => params.row.delivered && <Check />
    },
    {
        field: 'open',
        headerName: 'Open',
        flex: 1,
        renderCell: (params) => params.row.open && <Check />
    },
    {
        field: 'click',
        headerName: 'Click',
        flex: 1,
        renderCell: (params) => params.row.click && <Check />
    },
    {
        field: 'bounce',
        headerName: 'Bounce',
        flex: 1,
        renderCell: (params) => params.row.bounce && <Check />
    },
    {
        field: 'unsubscribe',
        headerName: 'Unsubscribe',
        flex: 1,
        renderCell: (params) => params.row.unsubscribe && <Check />
    },
    {
        field: 'reject',
        headerName: 'Reject',
        flex: 1,
        renderCell: (params) => params.row.reject && <Check />
    },
];

