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
    password: '',
    passwordConfirmation: ''
};

const registerFA = [
    { label: 'Email', id: 'email' },
    { label: 'Password', id: 'password', type: 'password' },
    { label: 'Password Confirmation', id: 'passwordConfirmation', type: 'password' }
];

const verifyResetFields = {
    email: '',
};

const verifyResetFA = [
    { label: 'Email', id: 'email' }
];

const userProps = {
    loginFields,
    loginFA,
    registerFields,
    registerFA,
    verifyResetFields,
    verifyResetFA
};

export default userProps;