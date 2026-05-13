/*earned income*/
/*
ticketRevenue
presenterFee
eventDate
partnerName
partnerWebsite
cashRevenue
totalIncome
title
venueName
venueAddress
eventUrl
eventDatabaseId
eventbriteId
*/

// const eventData = {
//     "event": {
//       "name": {
//         "html": "<p>Test Event</p>"
//       },
//       "summary": "Inspired by creation stories from all across the world, Relic explores the beginning of time in five evocative chapters",
//       "start": {
//         "timezone": "UTC",
//         "utc": "2025-05-12T02:00:00Z"
//       },
//       "end": {
//         "timezone": "UTC",
//         "utc": "2025-05-12T02:00:00Z"
//       },
//       "currency": "USD",
//       "online_event": false,
//       "organizer_id": "",
//       "listed": false,
//       "shareable": true,
//       "invite_only": false,
//       "show_remaining": true,
//       "capacity": 100,
//       "is_reserved_seating": true,
//       "is_series": false,
//       "show_pick_a_seat": false,
//       "show_seatmap_thumbnail": true,
//       "show_colors_in_seatmap_thumbnail": false,
//       "locale": "en_US"
//     }
//   }

// import { Avatar, Button } from "@mui/material";
// import deschematifyGrant from "../vars/deschematifyGrant";
// import schematifyGrant from "../vars/schematifyGrant";
// import { Check, Close, OpenInNew } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { dueMonthsSchema, grantSchema } from "../utils/yup/yup-schemas";
// import { months } from "../vars/dateObjects";
// import { GridColDef } from "@mui/x-data-grid";
// import { ItemWithFields, ItemWithNestedFields } from "../types/fnProps";

// const operationColumns: GridColDef[] = [
//   {
//     field: 'icon',
//     headerName: 'Avatar',
//     sortable: false, flex: 0,
//     renderCell: (params) => {
//       return <Avatar src={params.row?.avatar} alt={params.row?.name} />
//     }
//   },
//   { field: 'title', headerName: 'Title', flex: 2 },
//   { field: 'eventDate', headerName: 'Date', flex: 2 },
//   {
//     field: 'venueName',
//     headerName: 'Venue',
//     flex: 3,
//   },
//   {
//     field: 'select',
//     headerName: 'Select',
//     sortable: false,
//     flex: 2,
//     renderCell: (params) => (
//       <Link to={`/grants/${params.id}`}>
//         <Button variant="contained">
//           Select
//         </Button>
//       </Link>
//     )
//   }
// ];

/*
name
dateApplied
amountApplied
awarded ?
dateAwarded
amountAwarded
website
materialsLocation
*/


// const grantProps: ItemWithFields & ItemWithNestedFields = {
//   itemType: 'operations',
//   name: 'title',
//   columns: operationColumns,
//   sorting: { field: 'name', sort: 'desc' },
//   pageSize: 10,
//   pageSizeOptions: [10, 20, 30],
//   steps: ['fieldsArray', 'nestedArray', 'preview'],
// };

// export default grantProps;

