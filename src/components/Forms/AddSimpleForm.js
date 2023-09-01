import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import { uploadFile } from "../../utils/firebase/firebase-functions";


const AddSimpleForm = ({ fields, fieldsArray, handleFormCompletion }) => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileValue, setFileValue] = useState(null);
    const [filePath, setFilePath] = useState('');

    useEffect(() => {
        if (actionData) {
            if (actionData.errorType) {
                if (actionData.errorType === 'Validation error') {
                    setHasError(actionData);
                } else {
                    console.log(actionData);
                }
            }
            else {
                let match = false;
                Object.keys(actionData).forEach(key => {
                    if (Object.keys(fields).includes(key))
                        match = true;
                })
                if (match) {
                    setUserFields(actionData);
                    handleFormCompletion(fileValue ? Object.assign(actionData, { imgSrc: fileValue }) : actionData);
                }
            }
        }
    }, [actionData, handleFormCompletion, fileValue, fields]);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    useEffect(() => {
        if (fields.imgSrc) {
            setFileValue(fields.imgSrc);
        }
    }, [fields.imgSrc]);

    function removeError(e) {
        setHasError(prev => ({ ...prev, [e.target.id]: '' }))
    }

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    function handleFileChange(fileInput) {
        setFileValue(fileInput)
    }

    function submitForm(data) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        formData.append('intent', 'preflight');
        submit(formData, { method: 'POST' })
    }

    function handleSubmitEvent() {
        const fileUpload = fieldsArray.find(item => item.type === 'file');
        if (fileUpload && fileValue) {
            if (!filePath) {
                uploadFile(fileValue, `${fileUpload.path}/${fileValue.name}`)
                    .then(path => {
                        setFilePath(path);
                        submitForm(Object.assign(userFields, { [fileUpload.id]: path }));
                    })
            } else {
                submitForm(Object.assign(userFields, { [fileUpload.id]: filePath }));
            }
        } else if (fileUpload && !fileValue) {
            setHasError(prev => ({ ...prev, [fileUpload.id]: 'Please select file' }));
        } else {
            submitForm(userFields);
        }
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label, type, multiline, options }) => {
                        const props = {
                            key: id,
                            id: id,
                            name: id,
                            type: type || 'text',
                            value: type === 'file' ? fileValue : userFields[id],
                            onChange: type === 'file' ? handleFileChange : handleInputChange,
                            error: actionData?.errorType === 'Validation error' && hasError[id],
                            onFocus: removeError,
                            helperText: actionData?.errorType === 'Validation error' && hasError[id],
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            rows: 4
                        }
                        return type === 'file'
                            ? <MuiFileInput {...props} />
                            : type === 'select'
                                ? <FormControl key={id}>
                                    <InputLabel>{label}</InputLabel>
                                    <Select {...props}>
                                        {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{props.helperText}</FormHelperText>
                                </FormControl>
                                : <TextField {...props} />
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

export default AddSimpleForm;