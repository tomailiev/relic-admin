import { Alert, Box, Button, Collapse, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import VideoItem from "./VideoItem";
import { useActionData, useSubmit } from "react-router-dom";
import { initialVideoFA, videoFA } from "../../vars/fieldArrays";

// 'https://api.song.link/v1-alpha.1/links?url='

const fields = {
    featured: '',
    youtubeLink: '',
};

const steps = [
    'Add doc',
    'Preview'
];

const AddVideo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const actionData = useActionData();


    // function handleSubmission(data) {
    //     setSubmission(data);
    // }

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: '/videos/add' })
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
            {activeStep === 0 &&
                <AddSimpleForm fields={submission ? submission : fields} fieldsArray={submission ? videoFA : initialVideoFA} handleFormCompletion={setSubmission} />}
            {activeStep === 1 && submission && <VideoItem item={submission} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                    <Collapse in={!!actionData?.code}>
                        <Alert severity="error">
                            {actionData?.code}
                        </Alert>
                    </Collapse>
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

export default AddVideo;