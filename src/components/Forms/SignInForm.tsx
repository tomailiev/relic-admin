import { Alert, Box, Button, Collapse, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import userProps from "../../props/userProps";


const SignInForm = () => {
    const errorData = useActionData();
    const navigation = useNavigation();

    const [hasError, setHasError] = useState(userProps.loginFields);
    const [userFields, setUserFields] = useState(userProps.loginFields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (errorData) {
            if (errorData.errorType === 'Validation error') {
                setHasError(errorData);

            } else if (errorData.code) {
                errorData.code === 'functions/not-found' || errorData.code === 'auth/wrong-password'
                    ? setAlertMessage('Email or password not recognized')
                    : errorData.code === 'verify'
                        ? setAlertMessage(<NavLink to={'/verify'}> Email not verified. Get a verification email</NavLink>)
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
        <Paper sx={{ mx: 4, my: 2, p: 8 }}>
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
                    {/* {errorData?.code === 'verify' && <NavLink to={'/verify'}>Get a verification email</NavLink>} */}
                </Alert>
            </Collapse>
            <Form method="post" id="contact-form">
                <Stack spacing={3}>
                    {userProps.loginFA.map(({ id, label, type }) => (
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
            <Box textAlign={'center'} mt={2}>
                <NavLink to={'/reset'}>Forgot password?</NavLink>
            </Box>
        </Paper>
    );
};

export default SignInForm;