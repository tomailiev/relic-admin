import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { MuiFileInput } from "mui-file-input";
import { deschematify } from "../../vars/schemaFunctions";

const AddDynamicForm = ({ fields, fieldsArray, nestedFields, nestedArray, nestedName, handleFormCompletion }) => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();


    const [nestedItems, setNestedItems] = useState([]);
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
                handleFormCompletion(fileValue
                    ? Object.assign(deschematify(actionData, nestedName), { imgSrc: fileValue })
                    : deschematify(actionData, nestedName));
            }
        }
    }, [actionData, nestedName, handleFormCompletion, fileValue]);

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

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
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

    function addNestedItem() {
        setNestedItems(prev => prev.concat(nestedFields));
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label, type }) => (
                        type === 'file'
                            ? <MuiFileInput
                                key={id}
                                id={id}
                                name={id}
                                value={fileValue}
                                onChange={handleFileChange}
                                error={!!hasError[id] && (hasError[id] !== userFields[id])}
                                onFocus={() => setHasError(prev => ({ ...prev, [id]: '' }))}
                                helperText={(hasError[id] !== userFields[id]) && hasError[id]}
                                label={label}
                                size="small"
                            />
                            : <TextField
                                focused
                                key={id}
                                id={id}
                                name={id}
                                type={type || 'text'}
                                error={!!hasError[id] && (hasError[id] !== userFields[id])}
                                value={userFields[id]}
                                onFocus={() => setHasError(prev => ({ ...prev, [id]: '' }))}
                                onChange={handleInputChange}
                                helperText={(hasError[id] !== userFields[id]) && hasError[id]}
                                label={label}
                                variant="outlined"
                                size="small"
                                multiline={id === 'message'}
                                rows={4}
                            />
                    ))}
                    <Button onClick={addNestedItem}>
                        Add {nestedName}
                    </Button>
                    {nestedItems?.map((_item, index) => {
                        return <Container key={index}>
                            <Typography variant="h5">{nestedName} {index}</Typography>
                            <Stack spacing={2}>
                                {nestedArray.map(({ id, label, type, }) => {
                                    const itemId = `${nestedName}[${index}].${id}`;
                                    return <TextField
                                        focused
                                        key={id}
                                        id={itemId}
                                        name={itemId}
                                        type={type || 'text'}
                                        step={'any'}
                                        error={!!hasError[itemId] && (hasError[itemId] !== userFields[itemId])}
                                        value={userFields[itemId]}
                                        onFocus={() => setHasError(prev => ({ ...prev, [itemId]: '' }))}
                                        onChange={handleInputChange}
                                        helperText={(hasError[itemId] !== userFields[itemId]) && hasError[itemId]}
                                        label={label}
                                        variant="outlined"
                                        size="small"
                                        // multiline={id === 'message'}
                                        rows={4}
                                    />
                                })}
                            </Stack>
                        </Container>
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        name="intent"
                        value="preflight"
                        onClick={handleSubmitEvent}
                    >
                        Send
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddDynamicForm;