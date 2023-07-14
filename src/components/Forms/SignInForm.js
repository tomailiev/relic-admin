import { Alert, Button, Collapse, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const fields = {
    email: '',
    password: ''
};

const fieldsArray = [
    { label: 'Email', id: 'email' },
    { label: 'Password', id: 'password', type: 'password' }
]

const SignInForm = () => {
    const errorData = useActionData();
    const navigation = useNavigation();

    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (errorData) {
            if (errorData.errorType === 'Validation error') {
                setHasError(errorData);

            } else if (errorData.code) {
                errorData.code === 'auth/user-not-found'
                    ? setAlertMessage('Email/Pass not recognized')
                    : setAlertMessage(errorData.code);
            }
        }
    }, [errorData]);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: false,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state])

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Collapse in={!!alertMessage}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertMessage('');
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {alertMessage}
                </Alert>
            </Collapse>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label, type }) => (
                        <TextField
                            key={id}
                            id={id}
                            name={id}
                            type={type || 'text'}
                            error={!!hasError[id]}
                            value={userFields[id]}
                            onFocus={() => { setHasError(prev => ({ ...prev, [id]: '' })); setAlertMessage('') }}
                            onChange={handleInputChange}
                            helperText={hasError[id]}
                            label={label}
                            variant="outlined"
                            size="small"
                            multiline={id === 'message'}
                            rows={4}
                        />
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Log in
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default SignInForm;