import { Button, Paper, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";


const AddSimpleForm = ({ fields, fieldsArray, handleSubmission }) => {
    const actionData = useActionData();
    const navigation = useNavigation();



    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (actionData) {
            if (actionData.errorType === 'Validation error') {
                setHasError(actionData);
            }
            else if(actionData.id){
                handleSubmission(actionData);
            } else {
                console.log(actionData);
            }
        }
    }, [actionData]);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state])

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray.map(({ id, label, type }) => (
                        <TextField
                            key={id}
                            id={id}
                            name={id}
                            type={type || 'text'}
                            error={!!hasError[id] && hasError[id] !== userFields[id]}
                            value={userFields[id]}
                            onFocus={() => setHasError(prev => ({ ...prev, [id]: '' }))}
                            onChange={handleInputChange}
                            helperText={hasError[id] !== userFields[id] && hasError[id]}
                            label={label}
                            variant="outlined"
                            size="small"
                            multiline={id === 'message'}
                            rows={4}
                        />
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddSimpleForm;