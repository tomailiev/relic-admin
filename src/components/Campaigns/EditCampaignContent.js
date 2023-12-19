import { Box, Button, Grid, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddDynamicForm from "../Forms/AddDynamicForm";
import AddFileForm from "../Forms/AddFileForm";
import ItemSwitch from "../Items/ItemSwitch";
import EmailCompAddForm from "../Forms/EmailCompAddForm";
import { emailContentFieldArrays, emailContentFields } from "../../props/emailContentProps";

const components = [
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
    const [submission, setSubmission] = useState([]);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const { campaign } = useLoaderData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);



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
            <EmailCompAddForm fields={{ component: '' }} fieldsArray={[{ label: 'Component', id: 'component', type: 'select', options: components }]} handleFormCompletion={setSubmission} />
            <Grid container>
                <Grid item xs={12} md={6}>
                    {submission.map(item => {
                        console.log(item);
                        return <AddSimpleForm fields={emailContentFields[item.component]} fieldsArray={emailContentFieldArrays[item.component]} />
                    })}
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