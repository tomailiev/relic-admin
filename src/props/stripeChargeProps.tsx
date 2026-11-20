// export interface StripeCharge {
//     createdAt: Timestamp,
//     donationDate: string,
//     donorEmail: string,
//     donorId: string,
//     paymentIntentId: string,
//     processedAt: Timestamp,
//     status: string,
//     stripeChargeId: string,
// }

import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { ItemProps } from "../types/fnProps";

const stripeChargeColumns: GridColDef[] = [
    { field: 'stripeChargeId', headerName: 'Id', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'donationDate', headerName: 'Date', flex: 1, },
    {
        field: 'donorId', headerName: 'Donor Id', flex: 1, renderCell: (params) => (
            <Link
                to={`/donors/${params.row.donorId}`}
            >
                {params.row.donorId}
            </Link>
        )
    },
    { field: 'donorEmail', headerName: 'Donor Email', flex: 1, },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
            <Link to={`/stripeCharges/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const stripeChargeProps: ItemProps = {
    itemType: 'stripeCharges',
    name: 'stripeChargeId',
    columns: stripeChargeColumns,
    sorting: { field: 'donationDate', sort: 'desc' },
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    steps: ['preview']
};

export default stripeChargeProps;