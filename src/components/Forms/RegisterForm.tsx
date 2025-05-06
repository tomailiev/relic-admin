import { Alert, Button, Collapse, IconButton, Paper, Stack, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import userProps from "../../props/userProps";
import hasProperty from "../../vars/hasProperty";
import { newUserSchema } from "../../utils/yup/yup-schemas";
import { ValidationError } from "yup";

const RegisterForm = () => {
    const errorData = useActionData() as { result?: string, code?: string };
    const navigation = useNavigation();
    const submit = useSubmit();

    const [hasError, setHasError] = useState({});
    const [userFields, setUserFields] = useState(userProps.registerFields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (errorData) {
            if (errorData.code) {
                errorData.code === 'functions/permission-denied'
                    ? setAlertMessage('This email address is not permitted to create an account')
                    : setAlertMessage(errorData.code);
            } else if (errorData.result) {
                setAlertMessage('Email verification sent. Check your email!');
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

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    async function submitForm() {
        try {
            const validated = await newUserSchema.validate(userFields, { abortEarly: false });
            submit(validated, { encType: 'application/json', method: 'post' });
        } catch (e) {
            console.log(e);
            if (e instanceof ValidationError && e.inner) {
                const errors = e.inner?.reduce((p, c) => {
                    return c.path ? { ...p, [c.path]: c.message, } : p;
                }, {});

                setHasError(errors);
            }
        }
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
                    {userProps.registerFA.map(({ id, label, type }) => (
                        <TextField
                            key={id}
                            id={id}
                            name={id}
                            type={type || 'text'}
                            error={hasProperty(hasError, id) && hasError[id]}
                            value={hasProperty(userFields, id) && userFields[id]}
                            onFocus={() => { setHasError(prev => ({ ...prev, [id]: '' })); setAlertMessage('') }}
                            onChange={handleInputChange}
                            helperText={hasProperty(hasError, id) && hasError[id]}
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
                        onClick={submitForm}
                    >
                        Register
                    </Button>
                </Stack>
            </Form>}
        </Paper>
    );
};

export default RegisterForm;