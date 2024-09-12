import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const AddForm = ({ fields, fieldsArray, handleFormCompletion, schema, nestedLength, nestedArray, nestedName }) => {
    const navigation = useNavigation();
    const [hasError, setHasError] = useState({});
    const [userFields, setUserFields] = useState(fields);
    const [nestedFields, setNestedFields] = useState(Array(nestedLength).fill(fields));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileValue, setFileValue] = useState(null);
    console.log(nestedFields);

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

    async function submitForm() {
        const fileUpload = fieldsArray.find(item => item.type === 'file');
        const data = fileUpload
            ? Object.assign(userFields, { [fileUpload.id]: fileValue })
            : userFields;
        try {
            const validated = await schema.validate(data, { abortEarly: false });
            handleFormCompletion(validated);
            // setUserFields(fields);
        } catch (e) {
            console.log(e.inner);
            if (e.inner) {
                const errors = e.inner?.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, };
                }, {});
                setHasError(errors);
            }
        }
    }

    function removeNestedItem(index) {
        // Object.entries(userFields).forEach(([key,]) => {
        //     if (key.match(nestedName && key.match(nestedItems.length - 1))) {
        //         setUserFields(o => {
        //             const { [key]: _, ...rest } = o;
        //             return rest;
        //         })
        //     }
        // })
        // setNestedItems(prev => prev.slice(0, prev.length - 1));
        console.log(index);
        setNestedFields(prev => prev.slice(0, index).concat(prev.slice(index + 1)));
    }

    function addNestedItem() {
        setNestedFields(prev => prev.concat(fields));
    }

    // function handleSubmitEvent() {
    //     const fileUpload = fieldsArray.find(item => item.type === 'file');
    //     if (fileUpload) {
    //         submitForm(Object.assign(userFields, { [fileUpload.id]: fileValue }));
    //     } else {
    //         submitForm(userFields);
    //     }
    // }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                {nestedLength && <Button onClick={addNestedItem}>
                    Add {nestedName}
                </Button>}
                <Stack spacing={2}>
                    {!nestedLength
                        ? fieldsArray.map(({ id, label, type, multiline, options }) => {
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
                                // rows: 4
                            }

                            return type === 'file'
                                ? <MuiFileInput {...props} error={!!(hasError[id])} helperText={hasError[id]} />
                                : type === 'select'
                                    ? <FormControl key={id}>
                                        <InputLabel>{label}</InputLabel>
                                        <Select {...props}>
                                            {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
                                        </Select>
                                        <FormHelperText>{props.helperText}</FormHelperText>
                                    </FormControl>
                                    : <TextField {...props} />
                        })
                        : <Grid container>

                            {nestedFields?.map((_item, index) => {
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
                                                error: !!(hasError[itemId]),
                                                onFocus: removeError,
                                                helperText: hasError[itemId],
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
                                        })}
                                    </Stack>
                                    <Button onClick={() => removeNestedItem(index)}>
                                        Remove {nestedName}
                                    </Button>
                                </Grid>
                            })}

                        </Grid>
                    }

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

export default AddForm;