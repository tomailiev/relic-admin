import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, SelectProps, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { ChangeEvent, FocusEvent, useContext, useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import LoadingContext from "../../context/LoadingContext";
import { FieldsArrayItem, ItemWithFields } from "../../types/fnProps";
import { Schema, ValidationError } from "yup";
import hasProperty from "../../vars/hasProperty";
import RichTextEditor, { EditorValue, ToolbarConfig } from "react-rte";

// const toolbarConfig: ToolbarConfig = {
//     display: ['BLOCK_ALIGNMENT_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'INLINE_STYLE_BUTTONS', 'LINK_BUTTONS'],
//     INLINE_STYLE_BUTTONS: [
//         {}
//     ]
// }

const AddForm = ({ fields, fieldsArray, handleFormCompletion, schema, }: Partial<ItemWithFields> & { handleFormCompletion: (data: object) => void, schema: Schema<object> }) => {
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

    function removeError(_e: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>, id: string) {

        setHasError(prev => ({ ...prev, [id]: '' }))
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>): void;
    function handleInputChange(e: SelectChangeEvent<unknown>): void;
    function handleInputChange(e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>) {
        setUserFields(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    function handleRichTextInputChange(value: EditorValue, id: string) {
        setUserFields(prev => {
            return { ...prev, [id]: value }
        })

    }

    function getRTEValue(id: string) {
        if (userFields && hasProperty(userFields, id) && userFields[id]) {
            if (typeof userFields[id] === 'string') {
                return RichTextEditor.createValueFromString(userFields[id], 'html');
            } else {
                return userFields[id];
            }
        } else {
            return RichTextEditor.createEmptyValue();
        }
    }

    async function submitForm() {
        const updates: { [key: string]: string } = {}
        fieldsArray?.filter(el => el.type === 'rich-text').forEach(({ id }) => {
            if (userFields && hasProperty(userFields, id)) {
                updates[id] = (userFields[id] as EditorValue).toString('html', {
                    inlineStyles: {
                        BOLD: {
                            element: 'span',
                            style: { fontWeight: 'bold' },
                        },
                        ITALIC: {
                            element: 'span',
                            style: { fontStyle: 'italic' },
                        },
                        UNDERLINE: {
                            element: 'span',
                            style: { textDecoration: 'underline' }
                        },
                        STRIKETHROUGH: {
                            element: 'span',
                            style: { textDecoration: 'line-through' }
                        }
                    },
                });
            }
        });

        setUserFields(prev => ({ ...prev, ...updates }));
        console.log(userFields);
        
        try {

            const validated = await schema.validate(userFields, { abortEarly: false });
            handleFormCompletion(validated);
        } catch (e) {
            console.log(e);
            if (e instanceof ValidationError && e.inner) {
                const errors = e.inner?.reduce((p, c) => {
                    return c.path ? { ...p, [c.path]: c.message, } : p;
                }, {});

                setHasError(errors);
            }
        }
    }
    return (
        <Paper sx={{ mx: 2, my: 2, p: 5 }}>
            <Form method="post" id="contact-form">
                <Stack spacing={2}>
                    {fieldsArray && fieldsArray.map(({ id, label, type, multiline, options }: FieldsArrayItem) => {
                        const props: TextFieldProps = {
                            id: id,
                            name: id,
                            type: type || 'text',
                            value: (userFields && hasProperty(userFields, id)) ? userFields[id] : '',
                            onChange: handleInputChange,
                            error: hasProperty(hasError, id) && hasError[id],
                            onFocus: (e) => removeError(e, id),
                            label: label,
                            size: 'small',
                            multiline: multiline,
                            variant: 'outlined',
                            // rows: 4
                        }
                        const selectProps: SelectProps = {
                            id: id,
                            name: id,
                            type: type || 'text',
                            value: (userFields && hasProperty(userFields, id)) ? userFields[id] : '',
                            onChange: handleInputChange,
                            error: !!(hasProperty(hasError, id) && hasError[id]),
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
                                <Select {...selectProps}>
                                    {options && options.map(option => {
                                        return option.type && option.type === 'label'
                                            ? <Typography key={option.value} variant="subtitle2" sx={{ px: 2, fontWeight: "bold", background: '#cccccc', borderBottom: '1px solid #000000', borderTop: '1px solid #000000' }}>
                                                {option.value}
                                            </Typography>
                                            : <MenuItem value={option.value} key={option.value}>{option.display || option.value}</MenuItem>
                                    })}
                                </Select>
                                <FormHelperText>{hasProperty(hasError, id) ? hasError[id] : ''}</FormHelperText>
                            </FormControl>
                            : type === 'rich-text'
                                ? <RichTextEditor key={id} value={getRTEValue(id)} onChange={(value) => handleRichTextInputChange(value, id)} />
                                : <TextField {...props} helperText={hasProperty(hasError, id) ? hasError[id] : ''} InputLabelProps={{ shrink: true }} key={id} />
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