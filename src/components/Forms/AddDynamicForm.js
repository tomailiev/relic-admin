import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { MuiFileInput } from "mui-file-input";
import { deschematify } from "../../vars/schemaFunctions";

const AddDynamicForm = ({ fields, fieldsArray, nestedFields, nestedArray, nestedName, handleFormCompletion, nestedLength }) => {
    const actionData = useActionData();
    const navigation = useNavigation();
    const submit = useSubmit();


    const [nestedItems, setNestedItems] = useState(Array(nestedLength).fill(nestedFields));
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

    function removeError(e) {
        setHasError(prev => ({ ...prev, [e.target.id]: '' }))
    }

    function addNestedItem() {
        setNestedItems(prev => prev.concat(nestedFields));
    }


    function removeNestedItem() {
        Object.entries(userFields).forEach(([key,]) => {
            if (key.match(nestedName && key.match(nestedItems.length - 1))) {
                setUserFields(o => {
                    const { [key]: _, ...rest } = o;
                    return rest;
                })
            }
        })
        setNestedItems(prev => prev.slice(0, prev.length - 1));
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
                            error: !!(actionData?.errorType === 'Validation error' && hasError[id]),
                            onFocus: removeError,
                            helperText: actionData?.errorType === 'Validation error' && hasError[id],
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            rows: 4,
                            focused: true
                        }
                        return type === 'file'
                            ? <MuiFileInput {...props} error={hasError[id] === 'Please select file'} helperText={hasError[id] === 'Please select file' && hasError[id]} />
                            : type === 'select'
                                ? <FormControl key={id}>
                                    <InputLabel>{label}</InputLabel>
                                    <Select {...props}>
                                        {options.map((option, i) => <MenuItem value={i} key={option}>{option}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>{props.helperText}</FormHelperText>
                                </FormControl>
                                : <TextField {...props} />
                    })}
                    <Button onClick={addNestedItem}>
                        Add {nestedName}
                    </Button>
                    <Grid container>
                        {nestedItems?.map((_item, index) => {
                            return <Grid item key={index} sm={12} lg={4} xl={3} p={3}>
                                <Typography variant="h6" py={1}>{nestedName} {index}</Typography>
                                <Stack spacing={2}>
                                    {nestedArray.map(({ id, label, type, multiline, options }) => {
                                        const itemId = `${nestedName}[${index}].${id}`;
                                        const props = {
                                            key: id,
                                            id: itemId,
                                            name: itemId,
                                            type: type || 'text',
                                            value: type === 'file' ? fileValue : userFields[itemId],
                                            onChange: type === 'file' ? handleFileChange : handleInputChange,
                                            error: !!(actionData?.errorType === 'Validation error' && hasError[itemId]),
                                            onFocus: removeError,
                                            helperText: actionData?.errorType === 'Validation error' && hasError[itemId],
                                            label: label,
                                            size: 'small',
                                            multiline: multiline,
                                            variant: 'outlined',
                                            rows: 4,
                                            focused: true
                                        }
                                        return type === 'file'
                                            ? <MuiFileInput {...props} error={hasError[itemId] === 'Please select file'} helperText={hasError[itemId] === 'Please select file' && hasError[itemId]} />
                                            : type === 'select'
                                                ? <FormControl key={id}>
                                                    <InputLabel>{label}</InputLabel>
                                                    <Select {...props}>
                                                        {options.map((option, i) => <MenuItem value={i} key={option}>{option}</MenuItem>)}
                                                    </Select>
                                                    <FormHelperText>{props.helperText}</FormHelperText>
                                                </FormControl>
                                                : <TextField {...props} />
                                        // return <TextField
                                        //     focused
                                        //     key={id}
                                        //     id={itemId}
                                        //     name={itemId}
                                        //     type={type || 'text'}
                                        //     step={'any'}
                                        //     error={!!hasError[itemId] && (hasError[itemId] !== userFields[itemId])}
                                        //     value={userFields[itemId]}
                                        //     onFocus={() => setHasError(prev => ({ ...prev, [itemId]: '' }))}
                                        //     onChange={handleInputChange}
                                        //     helperText={(hasError[itemId] !== userFields[itemId]) && hasError[itemId]}
                                        //     label={label}
                                        //     variant="outlined"
                                        //     size="small"
                                        //     // multiline={id === 'message'}
                                        //     rows={4}
                                        // />
                                    })}
                                </Stack>
                            </Grid>
                        })}

                    </Grid>
                    <Button onClick={removeNestedItem} disabled={!nestedItems.length}>
                        Remove {nestedName}
                    </Button>
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

export default AddDynamicForm;