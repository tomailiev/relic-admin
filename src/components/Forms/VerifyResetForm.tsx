import { Alert, Button, Collapse, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import userProps from "../../props/userProps";


const VerifyResetForm = ({ reason }) => {
    const errorData = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();


    const [hasError, setHasError] = useState(userProps.verifyResetFields);
    const [userFields, setUserFields] = useState(userProps.verifyResetFields);
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
            } else if (errorData.result) {
                setAlertMessage('Email sent successfully. Check your email!');
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

    function handleSubmit() {
        const formData = new FormData();
        Object.entries(userFields).forEach(([key, value]) => formData.append(key, value));
        formData.append('reason', reason);
        submit(formData, { method: 'POST' })
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 8 }}>
            <Collapse in={!!alertMessage}>
                <Alert
                    severity={errorData?.result ? 'success' : 'error'}
                    action={
                        !errorData?.result && <IconButton
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
            {!errorData?.result && <Form method="post" id="contact-form">
                <Stack spacing={3}>
                    {userProps.verifyResetFA.map(({ id, label, type }) => (
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
                        onClick={handleSubmit}
                    // type="submit"
                    >
                        Send
                    </Button>
                </Stack>
            </Form>}
        </Paper>
    );
};

export default VerifyResetForm;