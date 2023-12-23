import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const AddForm = ({ fields, fieldsArray, handleFormCompletion, schema }) => {
    const navigation = useNavigation();
    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileValue, setFileValue] = useState(null);

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

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    function handleFileChange(fileInput) {
        setFileValue(fileInput)
    }

    async function submitForm(data) {
        try {
            const validated = await schema.validate(data, { abortEarly: false });
            console.log(validated);
            handleFormCompletion(validated);
            setUserFields(fields);
        } catch (e) {
            console.log(e);
            if (e.inner) {
                const errors = e.inner?.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, };
                }, {});
                setHasError(errors);
            }
        }
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
                    {fieldsArray.map(({ id, label, type, multiline, options }) => {
                        const props = {
                            key: id,
                            id: id,
                            name: id,
                            type: type || 'text',
                            value: type === 'file' ? fileValue : userFields[id],
                            onChange: type === 'file' ? handleFileChange : handleInputChange,
                            error: !!(hasError[id]),
                            onFocus: removeError,
                            helperText: hasError[id],
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            rows: 4
                        }
                        return type === 'file'
                            ? <MuiFileInput {...props} error={hasError[id] === 'Please select file'} helperText={hasError[id] === 'Please select file' && hasError[id]} />
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

export default AddForm;