import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";

const AddDynamic = ({ fields, nestedArray, nestedName, handleFormCompletion, nestedLength, schema, }) => {
    const navigation = useNavigation();

    const [nestedItems, setNestedItems] = useState(Array(nestedLength).fill(fields));
    const [hasError, setHasError] = useState(Array(nestedLength).fill(fields));
    // const [userFields, setUserFields] = useState(fields);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    function handleInputChange(e, index, id) {

        setNestedItems((prev) => {
            return prev.map((item, i) => i === index ? { ...item, [id]: e.target.value } : item)
        })
        // setUserFields(prev => {
        //     return { ...prev, [e.target.name]: e.target.value }
        // })
    }


    async function handleSubmitEvent() {

        try {
            const validated = await schema.validate(nestedItems, { abortEarly: false });
            // const validated = await schema.validate(data, { abortEarly: false });
            handleFormCompletion(validated);
            // setUserFields(fields);
        } catch (e) {
            if (e.inner) {
                setHasError(e.inner?.reduce((p, c) => {
                    const startChar = c.path?.indexOf('[');
                    const endChar = c.path?.indexOf(']');
                    const index = Number(c.path?.substring(startChar + 1, endChar));
                    const prop = c.path?.substring(endChar + 2);
                    if (!p[index]) p[index] = {};
                    p[index][prop] = c.message;
                    return p;
                }, []))
            }
        }

    }

    function removeError(e, index, id) {
        // setHasError(prev => ({ ...prev, [e.target.id]: '' }))
        setHasError((prev) => {
            return prev.map((item, i) => i === index ? { ...item, [id]: '' } : item)
        })
    }

    function removeNestedItem(index) {
        console.log(nestedItems);
        setNestedItems(prev => prev.slice(0, index).concat(prev.slice(index + 1)));
    }

    function addNestedItem() {
        setNestedItems(prev => prev.concat(fields));
    }

    // function addNestedItem() {
    //     setNestedItems(prev => prev.concat(nestedFields));
    // }


    // function removeNestedItem() {
    //     Object.entries(userFields).forEach(([key,]) => {
    //         if (key.match(nestedName && key.match(nestedItems.length - 1))) {
    //             setUserFields(o => {
    //                 const { [key]: _, ...rest } = o;
    //                 return rest;
    //             })
    //         }
    //     })
    //     setNestedItems(prev => prev.slice(0, prev.length - 1));
    // }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    <Button onClick={addNestedItem}>
                        Add {nestedName}
                    </Button>
                    <Grid container>
                        {nestedItems?.map((_item, index) => {
                            return <Grid item key={index} sm={12} lg={4} xl={3} p={3}>
                                <Typography variant="h6" py={1}>{nestedName} {index}</Typography>
                                <Stack spacing={2}>
                                    {nestedArray.map(({ id, label, type, multiline, options }) => {
                                        const itemId = `${nestedName}[${index}].${id}`;
                                        const props = {
                                            key: id,
                                            id: itemId,
                                            // name: itemId,
                                            type: type || 'text',
                                            value: nestedItems[index][id],
                                            onChange: (e) => handleInputChange(e, index, id),
                                            error: !!(hasError[index] ? hasError[index][id] : null),
                                            onFocus: (e) => removeError(e, index, id),
                                            helperText: hasError[index] ? hasError[index][id] : null,
                                            label: label,
                                            size: 'small',
                                            multiline: multiline,
                                            variant: 'outlined',
                                            rows: 4,
                                            focused: true
                                        }
                                        return type === 'select'
                                            ? <FormControl key={id}>
                                                <InputLabel>{label}</InputLabel>
                                                <Select {...props}>
                                                    {options.map((option, i) => <MenuItem value={i} key={option}>{option}</MenuItem>)}
                                                </Select>
                                                <FormHelperText>{props.helperText}</FormHelperText>
                                            </FormControl>
                                            : <TextField {...props} />
                                    })}
                                    <Button onClick={() => removeNestedItem(index)}>
                                        Remove {nestedName}
                                    </Button>
                                </Stack>
                            </Grid>
                        })}

                    </Grid>
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

export default AddDynamic;