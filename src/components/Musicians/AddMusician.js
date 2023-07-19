import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import MusicianItem from "./MusicianItem";
import { useSubmit } from "react-router-dom";

// 'https://api.song.link/v1-alpha.1/links?url='

const fields = {
    bio: '',
    featured: '',
    name: '',
    newTitle: '',
    pic: ''
};

const fieldsArray = [
    { label: 'Bio', id: 'bio', },
    { label: 'Name', id: 'name' },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Avatar', id: 'pic', type: 'file'}
]

const steps = [
    'Add doc',
    'Preview'
];

const AddMusician = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();


    function handleSubmission(data) {
        setSubmission(data);
        console.log(data);
    }

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: '/musicians/add' })
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
                <AddSimpleForm fields={submission || fields} fieldsArray={fieldsArray} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && <MusicianItem item={submission} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
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

export default AddMusician;