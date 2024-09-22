import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const AddForm = ({ fields, fieldsArray, handleFormCompletion, schema, }) => {
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

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


    async function submitForm() {

        try {
            const validated = await schema.validate(userFields, { abortEarly: false });
            handleFormCompletion(validated);
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
                            error: !!(hasError[id]),
                            onFocus: removeError,
                            helperText: hasError[id],
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            // rows: 4
                        }

                        return type === 'select'
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