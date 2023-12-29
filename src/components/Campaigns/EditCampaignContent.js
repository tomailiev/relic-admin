import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useFetcher, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import { emailContentFieldArrays, emailContentFields } from "../../props/emailContentProps";
import AddForm from "../Forms/AddForm";
import { emailComponentSchemas, selectComponentSchema } from "../../utils/yup/yup-schemas";
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const options = [
    'text',
    'image',
    // 'video',
    'button',
    'footer',
    'header',
    'section',
    'column',
    'divider',
    // 'spacer'
];

const EditCampaignContent = ({ itemType, fieldsArray, }) => {
    const { campaign } = useLoaderData();

    const [activeStep, setActiveStep] = useState(0);
    const [component, setComponent] = useState(null);
    const [componentList, setComponentList] = useState(campaign?.components || []);
    const [editedComponent, setEditedComponent] = useState(null);
    const [emailHtml, setEmailHtml] = useState(campaign?.html || '');
    // const [submission, setSubmission] = useState(null);
    const fetcher = useFetcher();
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const fSubmit = fetcher.submit;

    useEffect(() => {
        console.log('ww');
        fSubmit({ components: componentList }, { method: 'post', encType: 'application/json' });
    }, [componentList, fSubmit]);

    useEffect(() => {
        if (fetcher.data?.html) {
            setEmailHtml(fetcher.data.html)
        } else if (fetcher.data?.errors) {
            console.log(fetcher.data?.errors);
            setError({ severity: 'error', message: fetcher.data.errors.map(e => e.message).join(';\n') })
        }
    }, [fetcher.data, setError]);



    function addComponentToList(comp) {
        setComponent(null);
        if (editedComponent) {
            setComponentList(prev => prev.slice(0, comp.index).concat(comp).concat(prev.slice(comp.index + 1)))
            setEditedComponent(null);
        } else {
            setComponentList(prev => prev.concat(comp));
        }
    }

    function selectComponent(comp) {
        setComponent(null);
        setEditedComponent(null);
        setTimeout(() => {
            setComponent(comp.component);
        }, 250);
    }

    function editComponent(i) {
        setComponent(null);
        setTimeout(() => {
            setComponent(componentList[i].id.substring(componentList[i].id.lastIndexOf('-') + 1));
            setEditedComponent({ ...componentList[i], index: i });
        }, 250);
    }

    function deleteComponent(i) {
        setComponent(null);
        setEditedComponent(null);
        setComponentList(prev => prev.slice(0, i).concat(prev.slice(i + 1)))
    }

    function moveComponentUp(i) {
        setComponentList(prev => prev.slice(0, i - 1).concat(prev.slice(i - 1, i + 1).reverse()).concat(prev.slice(i + 1)));
    }

    function moveComponentDown(i) {
        setComponentList(prev => prev.slice(0, i).concat(prev.slice(i, i + 2).reverse()).concat(prev.slice(i + 2)));
    }

    function finishSubmission() {
        const formData = { ...campaign, components: componentList, html: emailHtml }
        submit(formData, { method: 'POST', encType: 'application/json', })
    }

    return (
        <Box m={4}>
            <AddForm fields={{ component: '' }} fieldsArray={[{ label: 'Component', id: 'component', type: 'select', options: options }]} handleFormCompletion={selectComponent} schema={selectComponentSchema} />
            <Grid container mx={4}>
                <Grid item xs={12} md={4}>
                    {componentList && <List dense={true}>
                        {componentList.map((componentItem, i, arr) => {
                            return <ListItem
                                key={`${componentItem.id}_${i}`}
                                sx={{borderRadius: '3px', border: '1px solid black'}}
                            >
                                <ListItemText primary={componentItem.id} secondary={<Typography variant="body2" overflow={'hidden'}>{componentItem.text || componentItem.variant || componentItem.src}</Typography>} />
                                <IconButton disabled={i === 0} edge="end" aria-label="up" onClick={() => moveComponentUp(i)}>
                                    <KeyboardArrowUp />
                                </IconButton>
                                <IconButton disabled={i === arr.length - 1} edge="end" aria-label="down" onClick={() => moveComponentDown(i)}>
                                    <KeyboardArrowDown />
                                </IconButton>
                                <IconButton edge="end" aria-label="edit" onClick={() => editComponent(i)}>
                                    <Edit />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteComponent(i)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        })}
                    </List>}
                    {component && <>
                        <Typography variant="h6" mx={4}>{editedComponent ? 'Edit' : 'Add'} {component}</Typography>
                        <AddForm fields={editedComponent || emailContentFields[component]} fieldsArray={emailContentFieldArrays[component]} handleFormCompletion={addComponentToList} schema={emailComponentSchemas[component]} />
                    </>}
                </Grid>
                <Grid item xs={12} md={8}>
                    {emailHtml && <iframe title="emailHtml" srcDoc={emailHtml} style={{ height: '800px', width: '600px' }} />}
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }}>
                </Box>
                <Button variant="contained" onClick={finishSubmission}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default EditCampaignContent;