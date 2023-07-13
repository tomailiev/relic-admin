import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";


const AddDynamicForm = ({ fields, fieldsArray, nestedFields, nestedArray, nestedName }) => {
    const errorData = useActionData();
    const navigation = useNavigation();


    const [nestedItems, setNestedItems] = useState([]);
    const [hasError, setHasError] = useState(fields);
    const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (errorData) {
            if (errorData.errorType === 'Validation error')
                setHasError(errorData);
            else
                console.log(errorData.code);
        }
    }, [errorData]);

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

    // function handleNestedInpitChange(e) {
    //     setNestedItemFields(prev => ({ ...prev, [e.target.id]: e.target.value }))
    // }

    function addNestedItem() {
        setNestedItems(prev => prev.concat(nestedFields));
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
                    <Button onClick={addNestedItem}>
                        Add {nestedName}
                    </Button>
                    {nestedItems?.map((_item, index) => {
                        return <Container key={index}>
                            <Typography variant="h5">{nestedName} {index}</Typography>
                            <Stack spacing={2}>
                                {nestedArray.map(({ id, label, type, }) => (
                                    <TextField
                                        key={id}
                                        id={`${nestedName}[${index}].${id}`}
                                        name={`${nestedName}[${index}].${id}`}
                                        type={type || 'text'}
                                        step={'any'}
                                        error={!!hasError[`${nestedName}[${index}].${id}`]}
                                        value={userFields[`${nestedName}[${index}].${id}}`]}
                                        onFocus={() => setHasError(prev => ({ ...prev, [`${nestedName}[${index}].${id}`]: '' }))}
                                        onChange={handleInputChange}
                                        helperText={hasError[`${nestedName}[${index}].${id}`]}
                                        label={label}
                                        variant="outlined"
                                        size="small"
                                        // multiline={id === 'message'}
                                        rows={4}
                                    />
                                ))}
                            </Stack>
                        </Container>
                    })}
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Send
                    </Button>
                </Stack>
            </Form>
        </Paper>
    );
};

export default AddDynamicForm;