import { Edit } from "@mui/icons-material";
import { Button, IconButton, List, ListItem, ListItemText, Paper, Stack, } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";


const AddFile = ({ fields, fieldsArray, handleFormCompletion, schema, }) => {
    const navigation = useNavigation();
    const [hasError, setHasError] = useState({});
    const [willEdit, setWillEdit] = useState({});
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

    function handleFileChange(newValue, id) {
        setUserFields(prev => {
            return { ...prev, [id]: newValue }
        });

        setWillEdit(prev => ({ ...prev, [id]: false }))
    }

    function skipSubmit() {
        let shouldSkip = true;
        fieldsArray.forEach(({ id }) => {

            if (!fields[id] || willEdit[id]) shouldSkip = false;
        })

        return shouldSkip;
    }

    async function submitForm() {

        if (skipSubmit()) return handleFormCompletion();

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
                    <List>
                        {fieldsArray.map(({ id, label, type, multiline }) => {
                            const props = {
                                id: id,
                                name: id,
                                type: type || 'file',
                                value: userFields[id],
                                onChange: (newValue) => handleFileChange(newValue, id),
                                error: !!(hasError[id]),
                                onFocus: removeError,
                                helperText: hasError[id],
                                label: label,
                                size: 'small',
                                multiline: multiline,
                                variant: 'outlined',
                                // rows: 4
                            }

                            return (fields[id] && !willEdit[id])
                                ? <ListItem key={id} secondaryAction={
                                    <IconButton edge="end" aria-label="edit" onClick={() => setWillEdit(prev => ({ ...prev, [id]: true }))}>
                                        <Edit />
                                    </IconButton>
                                }><ListItemText primary={fields[id]} />
                                </ListItem>
                                : <ListItem key={id}>
                                    <MuiFileInput {...props} error={!!(hasError[id])} helperText={hasError[id]} />
                                </ListItem>

                        })}
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        name="intent"
                        value="preflight"
                        onClick={submitForm}
                    >
                        {skipSubmit() ? 'Skip' : 'Submit'}
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddFile;