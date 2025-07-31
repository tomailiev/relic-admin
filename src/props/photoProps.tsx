import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import collections from "../vars/collections";
import { photoFileSchema, photoSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemWithFields, ItemWithFileFields } from "../types/fnProps";

const photoColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Preview',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.row?.name} />
        }
    },
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'path', headerName: 'Path', flex: 2 },
    { field: 'thumb', headerName: 'Thumb path', flex: 1 },
    { field: 'pc', headerName: 'Photo credit', flex: 1 },
    { field: 'caption', headerName: 'Caption', flex: 2 },
    {
        field: 'select',
        headerName: 'Select',
        sortable: false,
        flex: 2,
        renderCell: (params) => (
            <Link to={`/photos/${params.id}`}>
                <Button variant="contained">
                    View
                </Button>
            </Link>
        )
    }
];

const fields = {
    title: '',
    pc: '',
    caption: '',
};

const photoFA = [
    { label: 'title', id: 'title', multiline: true },
    { label: 'photo credit', id: 'pc' },
    { label: 'caption', id: 'caption' }
];

const photoFilesFA = [{ label: 'Photo', id: 'path', type: 'file', path: `${collections.images}/public/original`, displayName: 'imgSrc' }];

const photoProps: ItemWithFields & ItemWithFileFields = {
    itemType: 'photos',
    name: 'title',
    columns: photoColumns,
    sorting: { field: 'title', sort: 'asc' },
    pageSize: 15,
    pageSizeOptions: [5, 15, 30],
    fields: fields,
    fieldsArray: photoFA,
    filesFields: { path: '' },
    filesFieldsArray: photoFilesFA,
    steps: ['files', 'fieldsArray', 'preview'],
    filesSchema: photoFileSchema,
    fieldsArraySchema: photoSchema
};

export default photoProps;