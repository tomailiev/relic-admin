import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddDynamicForm from "../Forms/AddDynamicForm";
import AddFileForm from "../Forms/AddFileForm";
import ItemSwitch from "../Items/ItemSwitch";
import EmailCompAddForm from "../Forms/EmailCompAddForm";
import { emailContentFieldArrays, emailContentFields } from "../../props/emailContentProps";

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
    const [component, setComponent] = useState('');
    const [componentList, setComponentList] = useState([]);
    // const [submission, setSubmission] = useState(null);
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
        setComponentList(prev => prev.concat(comp));
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
            <EmailCompAddForm fields={{ component: '' }} fieldsArray={[{ label: 'Component', id: 'component', type: 'select', options: options }]} handleFormCompletion={setComponent} />
            <Grid container>
                <Grid item xs={12} md={6}>
                    {component && <>
                        <Typography variant="h6" mx={4}>Add {component}</Typography>
                        <AddSimpleForm fields={emailContentFields[component]} fieldsArray={emailContentFieldArrays[component]} handleFormCompletion={addComponentToList} />
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