import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import collections from "../vars/collections";
import { musicianFileSchema, musicianSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithFields, ItemWithFileFields } from "../types/fnProps";

const musicianColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return params.row?.imgSrc instanceof File
            ? <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.row?.name} />
            : <Avatar>{params.row?.name?.substring(0, 1)}</Avatar>
        }
    },
    // { field: 'id', headerName: 'ID', flex: 2 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'newTitle', headerName: 'Instrument', flex: 2 },
    { field: 'isCurrent', headerName: 'In current season', flex: 1, valueGetter: ({row}) => row.isCurrent ? 'Yes' : 'No' },
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
    pic: '',
    chair: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isCurrent: false
};

const musicianFA = [
    { label: 'Bio', id: 'bio', multiline: true },
    { label: 'Name', id: 'name' },
    { label: 'First name', id: 'firstName' },
    { label: 'Last name', id: 'lastName' },
    { label: 'Email', id: 'email' },
    { label: 'Phone #', id: 'phone' },
    { label: 'Is in current season', id: 'isCurrent', type: 'select', options: [{ value: 1, display: 'Yes' }, { value: 0, display: 'No' }] },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Chair', id: 'chair' }
];

const musicianFilesFA = [{ label: 'Avatar', id: 'pic', type: 'file', path: `${collections.images}/musicians`, displayName: 'imgSrc' }];

const musicianProps: ItemWithFields & ItemWithFileFields = {
    itemType: 'musicians',
    name: 'name',
    columns: musicianColumns,
    sorting: { field: 'isCurrent', sort: 'desc' },
    pageSize: 15,
    pageSizeOptions: [5, 15, 30],
    fields: fields,
    fieldsArray: musicianFA,
    filesFields: { pic: '' },
    filesFieldsArray: musicianFilesFA,
    steps: ['files', 'fieldsArray', 'preview'],
    filesSchema: musicianFileSchema,
    fieldsArraySchema: musicianSchema
};

export default musicianProps;