import { Button, Paper, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";

const fields = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const fieldsArray = [
    { label: 'First name', id: 'firstName' },
    { label: 'Last name', id: 'lastName' },
    { label: 'Email', id: 'email' },
    { label: 'Message', id: 'message' },
];

const AddForm = () => {
    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);

    function handleInputChange(e) {
        setUserFields(prev => {
            return { ...prev, [e.target.id]: e.target.value }
        })
    }

    
    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
            <Stack spacing={2}>
                        {fieldsArray.map(({ id, label }) => (
                            <TextField
                                key={id}
                                id={id}
                                name={id}
                                error={!!hasError[id]}
                                value={userFields[id]}
                                onFocus={() => setHasError(prev => ({ ...prev, [id]: '' }))}
                                onChange={handleInputChange}
                                helperText={hasError[id]}
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
                            // disabled={isSubmitting}
                            type="submit"
                        >
                            Send
                        </Button>
                    </Stack>
            </Form>
        </Paper>
    );
};

export default AddForm;