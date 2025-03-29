import { Alert, Box, Button, Collapse, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState, ReactElement, ChangeEvent } from "react";
import { Form, NavLink, useActionData, useNavigation, useSubmit } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import userProps from "../../props/userProps";
import { ValidationError } from "yup";
import { userSchema } from "../../utils/yup/yup-schemas";
import hasProperty from "../../vars/hasProperty";


const SignInForm = () => {
    const errorData = useActionData() as { result?: string, code?: string };
    const navigation = useNavigation();
    const submit = useSubmit();

    const [hasError, setHasError] = useState({});
    const [userFields, setUserFields] = useState(userProps.loginFields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | ReactElement>('');

    useEffect(() => {
        if (errorData) {
            if (errorData.code) {
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

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    async function submitForm() {
        try {
            const validated = await userSchema.validate(userFields, { abortEarly: false });
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
                            error={hasProperty(hasError, id)}
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