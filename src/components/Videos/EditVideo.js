import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import VideoItem from "./VideoItem";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { videoFA } from "../../vars/fieldArrays";
import ErrorContext from "../../context/ErrorContext";

const steps = [
    'Edit doc',
    'Preview'
];

const EditVideo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const item = useLoaderData(); //!!
    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);
    function handleSubmission(data) {
        setSubmission(data);
        console.log(data);
    }

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/videos/${item.id}/edit` }) //!!
    }

    function handleBack() {
        activeStep ? setActiveStep(prev => prev - 1) : navigate(`/videos/${item.id}`);
    }

    return (
        <Box m={4}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === 0 && item && //!!
                <AddSimpleForm fields={submission || item} fieldsArray={videoFA} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && <VideoItem item={submission} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    {activeStep ? 'Back' : 'Cancel'}
                </Button>
                <Box sx={{ flex: '1 1 auto', mx: 5, }} >
                </Box>
                {activeStep === 1
                    ? <Button variant="contained" onClick={finishSubmission}>
                        Finish
                    </Button>
                    : <Button variant="contained" onClick={() => setActiveStep(prev => prev + 1)} disabled={!submission}>
                        Next
                    </Button>
                }
            </Box>
        </Box>
    );
};

export default EditVideo;