import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, SelectProps, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { ChangeEvent, FocusEvent, useContext, useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import { ItemWithNestedFields } from "../../types/fnProps";
import { Schema, ValidationError } from "yup";

const AddDynamic = ({ nestedFields, nestedArray, nestedName, handleFormCompletion, nestedLength, schema, blanks }: Partial<ItemWithNestedFields> & { handleFormCompletion: (data: object) => void, schema: Schema, nestedLength: number, blanks: object }) => {
    const { isLoading } = useContext(LoadingContext);

    const navigation = useNavigation();

    const [nestedItems, setNestedItems] = useState(nestedFields as Array<any>);
    const [hasError, setHasError] = useState(Array(nestedLength).fill(blanks));
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const submissionStates = {
            submitting: true,
            loading: true,
            idle: false
        }
        setIsSubmitting(submissionStates[navigation.state]);
    }, [navigation.state]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, id: string): void;
    function handleInputChange(e: SelectChangeEvent<unknown>, index: number, id: string): void;
    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>, index: number, id: string) {

        setNestedItems((prev) => {
            return prev.map((item, i) => i === index ? { ...item, [id]: e.target.value } : item)
        })
    }


    async function handleSubmitEvent() {

        
        try {
            const validated = await schema.validate(nestedItems, { abortEarly: false });
            console.log(validated);
            
            handleFormCompletion(validated);
        } catch (e) {
            
            if (e instanceof ValidationError) {

                setHasError(e.inner?.reduce((p: { [key: string]: string }[], c) => {
                    
                    const startChar = c.path?.indexOf('[');
                    const endChar = c.path?.indexOf(']');
                    
                    
                    if ((startChar || startChar === 0) && endChar) {
                        
                        const index = Number(c.path?.substring(startChar + 1, endChar));
                        const prop = c.path?.substring(endChar + 2);
                        
                        if (!p[index]) p[index] = {};
                        if (prop) {
                            p[index][prop] = c.message;
                        }
                    }
                    
                    return p;
                }, []))
            }
        }

    }

    function removeError(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>, index: number, id: string) {
        setHasError((prev) => {
            return prev.map((item, i) => i === index ? { ...item, [id]: '' } : item)
        })
    }

    function removeNestedItem(index: number) {
        setNestedItems(prev => prev.slice(0, index).concat(prev.slice(index + 1)));
    }

    function addNestedItem() {
        setNestedItems(prev => prev.concat(blanks));
    }

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    <Button onClick={addNestedItem}>
                        Add {nestedName}
                    </Button>
                    <Grid container>
                        {nestedItems?.map((_item, index: number, arr: any[]) => {

                            return <Grid item key={index} sm={12} lg={4} xl={3} p={3}>
                                <Typography variant="h6" py={1}>{nestedName} {index}</Typography>
                                <Stack spacing={2}>
                                    {nestedArray?.map(({ id, label, type, multiline, options }) => {
                                        // const itemId = `[${index}].${id}`;

                                        const props: TextFieldProps = {
                                            value: arr[index][id],
                                            id: id,
                                            name: id,
                                            type: type || 'text',
                                            onChange: (e) => handleInputChange(e, index, id),
                                            error: !!(hasError[index] ? hasError[index][id] : null),
                                            onFocus: (e) => removeError(e, index, id),
                                            label: label,
                                            size: 'small',
                                            multiline: multiline,
                                            variant: 'outlined',
                                            rows: 4,
                                        }
                                        const selectProps: SelectProps = {
                                            value: arr[index][id],
                                            id: id,
                                            name: id,
                                            type: type || 'text',
                                            onChange: (e) => handleInputChange(e, index, id),
                                            error: !!(hasError[index] ? hasError[index][id] : null),
                                            onFocus: (e) => removeError(e, index, id),
                                            label: label,
                                            size: 'small',
                                            multiline: multiline,
                                            variant: 'outlined',
                                            rows: 4,
                                        }
                                        return type === 'select'
                                            ? <FormControl key={id}>
                                                <InputLabel shrink>{label}</InputLabel>
                                                <Select {...selectProps}>
                                                    {options?.map(option => {
                                                        return option.type && option.type === 'label'
                                                            ? <Typography key={option.value} variant="subtitle2" sx={{ px: 2, fontWeight: "bold", background: '#cccccc', borderBottom: '1px solid #000000', borderTop: '1px solid #000000' }}>
                                                                {option.value}
                                                            </Typography>
                                                            : <MenuItem value={option.value} key={option.value}>{option.display || option.value}</MenuItem>
                                                    })}                                                </Select>
                                                <FormHelperText>{hasError[index] ? hasError[index][id] : null}</FormHelperText>
                                            </FormControl>
                                            : <TextField {...props} InputLabelProps={{ shrink: true }} key={id} helperText={hasError[index] ? hasError[index][id] : null} />
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
                        disabled={isSubmitting || isLoading}
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