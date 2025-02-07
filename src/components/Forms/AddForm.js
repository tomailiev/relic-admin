import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";


const AddForm = ({ fields, fieldsArray, handleFormCompletion, schema, }) => {
    const { isLoading } = useContext(LoadingContext);
    const navigation = useNavigation();
    const [hasError, setHasError] = useState({});
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setUserFields(fields)
    }, [fields]);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    function removeError(_e, id) {

        setHasError(prev => ({ ...prev, [id]: '' }))
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
                            id: id,
                            name: id,
                            type: type || 'text',
                            value: userFields[id],
                            onChange: handleInputChange,
                            error: !!(hasError[id]),
                            onFocus: (e) => removeError(e, id),
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            // rows: 4
                        }

                        return type === 'select'
                            ? <FormControl key={id}>
                                <InputLabel shrink>{label}</InputLabel>
                                <Select {...props}>
                                    {options.map(option => <MenuItem value={option.value} key={option.value}>{option.display || option.value}</MenuItem>)}
                                </Select>
                                <FormHelperText>{hasError[id]}</FormHelperText>
                            </FormControl>
                            : <TextField {...props} helperText={hasError[id]} InputLabelProps={{ shrink: true }} key={id} />
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || isLoading}
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