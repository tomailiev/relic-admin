import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import collections from "../vars/collections";

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
    { field: 'newTitle', headerName: 'Instrument', flex: 2 },
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

const fields = {
    bio: '',
    featured: '',
    name: '',
    newTitle: '',
    pic: ''
};

const musicianFA = [
    { label: 'Bio', id: 'bio', multiline: true },
    { label: 'Name', id: 'name' },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Avatar', id: 'pic', type: 'file', path: `${collections.images}/musicians` }
];

const musicianProps = {
    itemType: 'musicians',
    name: 'name',
    columns: musicianColumns,
    sorting: { field: 'newTitle', sort: 'asc' },
    pageSize: 15,
    pageSizeOptions: [5, 15, 30],
    formType: 'simple', 
    fields: fields,
    fieldsArray: musicianFA,
};

export default musicianProps;