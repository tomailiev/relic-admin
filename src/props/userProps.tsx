import { Avatar } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const loginFields = {
    email: '',
    password: ''
};

const loginFA = [
    { label: 'Email', id: 'email' },
    { label: 'Password', id: 'password', type: 'password' }
];

const registerFields = {
    email: '',
    displayName: '',
    password: '',
    passwordConfirmation: ''
};

const registerFA = [
    { label: 'Email', id: 'email' },
    { label: 'Name', id: 'displayName' },
    { label: 'Password', id: 'password', type: 'password' },
    { label: 'Password Confirmation', id: 'passwordConfirmation', type: 'password' }
];

const verifyResetFields = {
    email: '',
};

const verifyResetFA = [
    { label: 'Email', id: 'email' }
];

const userColumns: GridColDef[] = [
    {
        field: 'icon',
        headerName: 'Avatar',
        sortable: false, flex: 0,
        renderCell: (params) => {
            return <Avatar src={params.row.avatar} alt={params.row?.displayName} />
        }
    },
    { field: 'displayName', headerName: 'Name', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 2 },
];

const userProps = {
    loginFields,
    loginFA,
    registerFields,
    registerFA,
    verifyResetFields,
    verifyResetFA,
    columns: userColumns
};

export default userProps;