import { TextSnippet } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { newTextSchema } from "../utils/yup/yup-schemas";
import { GridColDef } from "@mui/x-data-grid";
import { ItemProps } from "../types/fnProps";

const textColumns: GridColDef[] = [
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

const fields = {
    key: '',
    value: ''
};

const textFA = [
    { label: 'Title', id: 'key' },
    { label: 'Value', id: 'value', multiline: true }
];

const textProps: ItemProps = {
    itemType: 'texts',
    name: 'id',
    columns: textColumns,
    sorting: { field: 'id', sort: 'asc' },
    pageSize: 25,
    pageSizeOptions: [10, 25, 50],
    fields: fields,
    fieldsArray: textFA,
    steps: ['fieldsArray', 'preview'],
    schemas: { fieldsArray: newTextSchema }
};

export default textProps;