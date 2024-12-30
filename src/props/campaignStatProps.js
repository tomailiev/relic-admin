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

export const clickSorting = { field: 'link', sort: 'asc' };

export const uniqueOpenColumns = [
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
        field: 'count',
        headerName: 'Times open',
        flex: 1
    },
    {
        field: 'timestamps',
        headerName: 'Timestamps',
        flex: 2,
        valueGetter: ({ row }) => row.timestamps.map(ts => ts.toDate()).join('\n')
    }
];

export const uniqueOpenSorting = { field: 'count', sort: 'desc' };

export const uniqueClickColumns = [
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
        field: 'links',
        headerName: 'Links opened',
        flex: 2,
        valueGetter: ({ row }) => row.links.join('\n')
    },
    {
        field: 'timestamps',
        headerName: 'Timestamps',
        flex: 2,
        valueGetter: ({ row }) => row.timestamps.map(ts => ts.toDate())
    }
];

export const uniqueClickSorting = { field: 'links', sort: 'desc' }

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

export const fullSorting = { field: 'open', sort: 'desc' };

export const openReducer = (a, c) => {
    const item = a.find(sub => sub.email === c.email);
    if (!item) {
        return a.concat({
            email: c.email,
            count: 1,
            timestamps: [c.timestamp]
        });
    }
    item.count++;
    item.timestamps.push(c.timestamp);
    return a;
}

export const clickReducer = (a, c) => {
    const item = a.find(sub => sub.email === c.email);
    if (!item) {
        return a.concat({
            email: c.email,
            timestamps: [c.timestamp],
            links: [c.link]
        });
    }
    item.timestamps.push(c.timestamp);
    item.links.push(c.link);    
    return a;
}

export const campaignStatSummarizer = (campaign) => {
    return campaign.sentTo.reduce((a, c) => {
        const email = c.email;
        return a.concat({
            email,
            // delivered: campaign.delivered?.map(a => a.email).includes(email),
            open: campaign.open?.map(a => a.email).includes(email),
            click: campaign.click?.map(a => a.email).includes(email),
            bounce: campaign.bounce?.map(a => a.email).includes(email),
            reject: campaign.reject?.map(a => a.email).includes(email),
            unsubscribe: campaign.unsubscribe?.map(a => a.email).includes(email),
        })
    }, []);
}

