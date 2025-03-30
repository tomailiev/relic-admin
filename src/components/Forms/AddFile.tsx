import { Edit } from "@mui/icons-material";
import { Button, IconButton, List, ListItem, ListItemText, Paper, Stack, } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { FocusEvent, useContext, useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import { Schema, ValidationError } from "yup";
import { ItemProps, ItemWithFields, ItemWithFileFields } from "../../types/fnProps";
import hasProperty from "../../vars/hasProperty";


const AddFile = ({ filesFields, filesFieldsArray, handleFormCompletion, schema, }: Partial<ItemWithFileFields> & { handleFormCompletion: (data: object | null) => void, schema: Schema<object> }) => {
    const { isLoading } = useContext(LoadingContext);

    const navigation = useNavigation();
    const [hasError, setHasError] = useState({});
    const [willEdit, setWillEdit] = useState({});
    const [userFields, setUserFields] = useState(filesFields);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    useEffect(() => {
        if (filesFieldsArray && filesFields) {
            filesFieldsArray.forEach(({ id, displayName }) => {
                if (!!displayName && hasProperty(filesFields, displayName) && filesFields[displayName]) {
                    setUserFields(prev => ({ ...prev, [id]: filesFields[displayName] }));
                }
            })
        }
    }, [filesFields, filesFieldsArray])

    function removeError(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
        setHasError(prev => ({ ...prev, [e.target.name]: '' }))
    }

    function handleFileChange(newValue: File | null, id: string) {

        if (newValue) {
            setUserFields(prev => {
                return { ...prev, [id]: newValue }
            });

            setWillEdit(prev => ({ ...prev, [id]: false }))
        }
    }

    function skipSubmit() {
        let shouldSkip = true;
        if (filesFieldsArray && filesFields) {
            filesFieldsArray.forEach(({ id }) => {
                if (!userFields || !hasProperty(userFields, id)) return;
                if (
                    !hasProperty(filesFields, id)
                    || (filesFields[id] as string)?.substring((filesFields[id] as string).lastIndexOf('/') + 1) !== (userFields[id] as File).name
                    || willEdit[id]
                ) {
                    shouldSkip = false;
                }
            })
        }

        return shouldSkip;
    }

    async function submitForm() {

        if (skipSubmit()) return handleFormCompletion(null);

        try {
            console.log(userFields);

            const validated = await schema.validate(userFields, { abortEarly: false });
            handleFormCompletion(validated);
        } catch (e) {
            console.log(e);

            if (e instanceof ValidationError) {
                const errors = e.inner?.reduce((p, c) => {
                    return c.path ? { ...p, [c.path]: c.message, } : p;
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
                        {filesFieldsArray?.map(({ id, label, type, multiline }) => {
                            const props = {
                                id: id,
                                name: id,
                                type: type || 'file',
                                value: (!!userFields && hasProperty(userFields, id)) ? userFields[id] as File : null,
                                onChange: (newValue: File | null) => handleFileChange(newValue, id),
                                error: !!(hasProperty(hasError, id)),
                                onFocus: removeError,
                                helperText: hasProperty(hasError, id) && hasError[id],
                                label: label,
                                size: 'small' as 'small' | 'medium',
                                multiline: multiline,
                                variant: 'outlined' as "outlined" | "filled" | "standard",
                                // rows: 4
                            }

                            return ((filesFields && hasProperty(filesFields, id)) && !willEdit[id])
                                ? <ListItem key={id} secondaryAction={
                                    <IconButton edge="end" aria-label="edit" onClick={() => setWillEdit(prev => ({ ...prev, [id]: true }))}>
                                        <Edit />
                                    </IconButton>
                                }><ListItemText primary={userFields && (userFields[id] as File)?.name || filesFields[id]} />
                                </ListItem>
                                : <ListItem key={id}>
                                    <MuiFileInput {...props} error={hasProperty(hasError, id)} helperText={hasProperty(hasError, id) && hasError[id]} />
                                </ListItem>

                        })}
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || isLoading}
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