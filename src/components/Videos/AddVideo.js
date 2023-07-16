import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import VideoItem from "./VideoItem";

const fields = {
    featured: '',
    title: '',
    youtubeId: '',
    thumbnail: '',
};

const fieldsArray = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
];


const AddVideo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);

    const steps = [
        'Add doc',
        'Preview'
    ];

    const changeActiveStep = (num) => {
        setActiveStep(prev => prev + num);
    }

    function handleSubmission(data) {
        console.log(data);
        setSubmission(data);
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
            {activeStep === 0 && <AddSimpleForm fields={submission || fields} fieldsArray={fieldsArray} handleSubmission={handleSubmission} />}
            {activeStep === 1 && submission && <VideoItem video={submission} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => changeActiveStep(-1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={() => changeActiveStep(1)} disabled={!submission}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
};

export default AddVideo;