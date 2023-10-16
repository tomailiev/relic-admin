import { Button, Paper, Stack, } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useContext, useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";


const AddFileForm = ({ fields, fieldsArray, handleFormCompletion }) => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileValue, setFileValue] = useState(null);
    const { setError } = useContext(ErrorContext);


    useEffect(() => {
        if (actionData) {
            console.log(actionData);
            if (actionData.errorType) {
                if (actionData.errorType === 'Validation error') {
                    setHasError(actionData);
                } else if (actionData.error) {
                    console.log('error');
                    setError(actionData);
                }
            } else {
                let match = false;
                Object.keys(actionData).forEach(key => {
                    if (Object.keys(fields).includes(key))
                        match = true;
                })
                if (match) {
                    setUserFields(actionData);
                    handleFormCompletion(actionData);
                }
            }
        }
    }, [actionData, handleFormCompletion, fields, setError]);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    function removeError(e) {
        console.log(hasError);
        setHasError(prev => ({ ...prev, [e.target.name]: '' }))
    }


    function handleFileChange(fileInput) {
        setFileValue(fileInput);
    }

    function submitForm(data) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append('intent', 'preflight');
        submit(formData, { method: 'POST', encType: 'multipart/form-data' })
    }

    function handleSubmitEvent() {
        const fileUpload = fieldsArray.find(item => item.type === 'file');
        if (fileUpload) {
            submitForm(Object.assign(userFields, { [fileUpload.id]: fileValue }));
        } else {
            submitForm(userFields);
        }
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label }) => {
                        const props = {
                            key: id,
                            id: id,
                            name: id,
                            value: fileValue,
                            onChange: handleFileChange,
                            error: !!(actionData?.errorType === 'Validation error' && hasError[id]),
                            onFocus: removeError,
                            helperText: actionData?.errorType === 'Validation error' && hasError[id],
                            label: label,
                            size: 'small',
                            variant: 'outlined',
                        }
                        return <MuiFileInput {...props} />
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        name="intent"
                        value="preflight"
                        onClick={handleSubmitEvent}
                    >
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddFileForm;