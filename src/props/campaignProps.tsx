import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { clickReducer, openReducer } from "./campaignStatProps";
import { campaignSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithFields } from "../types/fnProps";

const campaignColumns: GridColDef[] = [
    { field: 'subject', headerName: 'Subject', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1, valueGetter: ({ row }) => row.status ? 'Draft' : 'Sent' },
    { field: 'datetime', headerName: 'Date', flex: 1, valueGetter: ({ row }) => row.datetime.toDate() },
    {
        field: 'edit',
        headerName: 'Stats',
        sortable: false,
        flex: 2,
        renderCell: ({ row }) => {
            return `Open: ${((row.open?.reduce(openReducer, []).length / row.sentTo?.length * 100) || (0)).toFixed(1)}%,
            Click: ${((row.click?.reduce(clickReducer, []).length / row.sentTo?.length * 100) || (0)).toFixed(1)}%`
        }
    },
    {
        field: 'details',
        headerName: 'Details',
        sortable: false,
        flex: 1,
        renderCell: (params) => {
            return (
                <Link to={`/campaigns/${params.id}`}>
                    <Button variant="contained">
                        {params.row.status === 1 ? 'View' : 'Full stats'}
                    </Button>
                </Link>
            )
        }
    },
];

const campaignFields = {
    subject: '',
    to: '',
    from: '',
};

const campaignsFA = [
    { label: 'Subject', id: 'subject', },
    {
        label: 'To', id: 'to', type: 'select', options: [{ value: 'All subscribers' }, { type: 'label', value: 'Donor Tiers' }, { value: 'Zeus & Hera $10,000+' }, { value: 'Apollo $5000+' }, { value: 'Hermes $1000+' }, { value: 'Artemis $500+' }, { value: 'Dionysus $250+' }, { value: 'Muse $0+' }, { type: 'label', value: 'Custom Lists' }
        ]
    },
    {
        label: 'From', id: 'from', type: 'select', options: [
            { value: 'info@relicensemble.org' },
            { value: 'toma@relicensemble.org' },
            { value: 'rebecca@relicensemble.org' },
            { value: 'natalie@relicensemble.org' },
            { value: 'cullen@relicensemble.org' },
            { value: 'aniela@relicensemble.org' },
            { value: 'kako@relicensemble.org' },
        ]
    },
];

const campaignProps: ItemWithFields = {
    itemType: 'campaigns',
    name: 'subject',
    columns: campaignColumns,
    sorting: { field: 'datetime', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    fields: campaignFields,
    fieldsArray: campaignsFA,
    steps: ['fieldsArray'],
    fieldsArraySchema: campaignSchema
};

export default campaignProps;