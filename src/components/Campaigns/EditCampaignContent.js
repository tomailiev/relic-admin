import { Box, Button, Grid, IconButton, List, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import { emailContentFieldArrays, emailContentFields } from "../../props/emailContentProps";
import AddForm from "../Forms/AddForm";
import { emailComponentSchemas, selectComponentSchema } from "../../utils/yup/yup-schemas";
import { Delete } from "@mui/icons-material";

const options = [
    'text',
    'image',
    'video',
    'button',
    'footer',
    'header',
    // 'divider',
    // 'spacer'
];

const EditCampaignContent = ({ itemType, fieldsArray, }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [component, setComponent] = useState(null);
    const [componentList, setComponentList] = useState([]);
    // const [submission, setSubmission] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const { campaign } = useLoaderData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function addComponentToList(comp) {
        console.log(componentList);
        setComponent(null);
        setComponentList(prev => prev.concat(comp));
    }

    function selectComponent(comp) {
        setComponent(null);
        setTimeout(() => {
            setComponent(comp.component);
        }, 500);
    }

    function editComponent(event, i) {
        console.log(selectedComponent);
        setSelectedComponent(i)
    }

    // function addTags(arr) {
    //     const arrCopy = JSON.parse(JSON.stringify(arr));
    //     const toField = arrCopy.find(item => item.id === 'to');
    //     toField.options = toField.options.concat(tags.map(([key]) => key));
    //     return arrCopy;
    // }

    // function finishSubmission() {
    //     const formData = new FormData();
    //     Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
    //     submit(formData, { method: 'POST', action: `/${itemType}/${campaign.id}/edit` })
    // }

    return (
        <Box m={4}>
            <AddForm fields={{ component: '' }} fieldsArray={[{ label: 'Component', id: 'component', type: 'select', options: options }]} handleFormCompletion={selectComponent} schema={selectComponentSchema} />
            <Grid container>
                <Grid item xs={12} md={6}>
                    {componentList && <List dense={true}>
                        {componentList.map((componentItem, i) => {
                            return <ListItemButton
                                selected={selectedComponent === i}
                                onClick={(e) => editComponent(e, i)}
                            >
                                <ListItemText primary={componentItem.id} secondary={componentItem.text || componentItem.version || componentItem.src} />
                                <IconButton edge="end" aria-label="delete" onClick={() => setComponentList(prev => prev.slice(0, i).concat(prev.slice(i + 1)))}>
                                    <Delete />
                                </IconButton>
                            </ListItemButton>
                        })}
                    </List>}
                    {component && <>
                        <Typography variant="h6" mx={4}>Add {component}</Typography>
                        <AddForm fields={emailContentFields[component]} fieldsArray={emailContentFieldArrays[component]} handleFormCompletion={addComponentToList} schema={emailComponentSchemas[component]} />
                    </>}
                    {/* {submission.map(item => {
                        console.log(item);
                        return <AddSimpleForm fields={emailContentFields[item.component]} fieldsArray={emailContentFieldArrays[item.component]} />
                    })} */}
                </Grid>
                <Grid item xs={12} md={6}>

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
                <Button variant="contained" onClick={() => null}>
                    Preview
                </Button>
            </Box>
        </Box>
    );
};

export default EditCampaignContent;