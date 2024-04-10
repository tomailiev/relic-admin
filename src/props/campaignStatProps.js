import { Link } from "react-router-dom";
import { Link as ExternalLink } from '@mui/material'

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

