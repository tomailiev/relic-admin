import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation, useSubmit } from "react-router-dom";
import { uploadFile } from "../../utils/firebase/firebase-functions";


const EmailCompSelectForm = ({ fields, fieldsArray, handleFormCompletion }) => {
    const actionData = useActionData();
    const navigation = useNavigation();
    // const submit = useSubmit();

    const [hasError, setHasError] = useState(fields);
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

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    function submitForm(_data) {
        handleFormCompletion(userFields.component);
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
                            value: userFields[id],
                            onChange: handleInputChange,
                            error: !!(actionData?.errorType === 'Validation error' && hasError[id]),
                            onFocus: removeError,
                            label: label,
                            size: 'small',
                            variant: 'outlined',
                            rows: 4
                        }
                        return <FormControl key={id}>
                            <InputLabel>{label}</InputLabel>
                            <Select {...props}>
                                {options.map(option => <MenuItem value={option} key={option}>{option}</MenuItem>)}
                            </Select>
                            <FormHelperText>{props.helperText}</FormHelperText>
                        </FormControl>
                    })}

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        name="intent"
                        value="preflight"
                        onClick={submitForm}
                    >
                        Add
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default EmailCompSelectForm;