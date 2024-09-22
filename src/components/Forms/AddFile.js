import { Button, Paper, Stack, } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const AddFile = ({ fields, fieldsArray, handleFormCompletion, schema, }) => {
    const navigation = useNavigation();
    const [hasError, setHasError] = useState({});
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    function removeError(e) {
        setHasError(prev => ({ ...prev, [e.target.name]: '' }))
    }

    function handleFileChange(newValue, id) {
        setUserFields(prev => {
            return { ...prev, [id]: newValue }
        })
    }

    async function submitForm() {

        try {
            const validated = await schema.validate(userFields, { abortEarly: false });
            handleFormCompletion(validated);
        } catch (e) {
            if (e.inner) {
                const errors = e.inner?.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, };
                }, {});

                setHasError(errors);
            }
        }
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label, type, multiline }) => {
                        const props = {
                            key: id,
                            id: id,
                            name: id,
                            type: type || 'file',
                            value: userFields[id],
                            onChange: (newValue) => handleFileChange(newValue, id),
                            error: !!(hasError[id]),
                            onFocus: removeError,
                            helperText: hasError[id],
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            // rows: 4
                        }

                        return <MuiFileInput {...props} error={!!(hasError[id])} helperText={hasError[id]} />

                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        name="intent"
                        value="preflight"
                        onClick={submitForm}
                    >
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddFile;