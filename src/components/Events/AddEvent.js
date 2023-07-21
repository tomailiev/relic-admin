import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react";
import { useSubmit } from "react-router-dom";
import AddDynamicForm from "../Forms/AddDynamicForm";
import EventItem from "./EventItem";
import schematifyEvent from "../../vars/schematifyEvent";

// 'https://api.song.link/v1-alpha.1/links?url='

const eventFields = {
    dateDone: '',
    description: '',
    imageUrl: '',
    title: '',
    // performances: []
};

const eventFieldsArray = [
    { label: 'Date done', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description' },
    { label: 'Image Url', id: 'imageUrl', type: 'file', path: 'mock-images/events' },
    { label: 'Title', id: 'title' },
    // { label: 'Performances', id: 'performances', type: 'array' }
];

const performanceFields = {
    date: '',
    time: '',
    id: '',
    location: '',
    url: '',
    venue: '',
    lat: '',
    lng: '',
};

const performanceFieldArray = [
    { label: 'Date', id: 'date', type: 'date' },
    { label: 'Time', id: 'time', type: 'time' },
    { label: 'Order #', id: 'id', },
    { label: 'Location (Portland, OR)', id: 'location' },
    { label: 'Url', id: 'url' },
    { label: 'Venue', id: 'venue' },
    { label: 'Latitude', id: 'lat', },
    { label: 'Longitude', id: 'lng', },
];

const steps = [
    'Add doc',
    'Preview'
];


const AddEvent = () => {
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
        submit(formData, { method: 'POST', action: '/events/add' })
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
                <AddDynamicForm fields={submission || eventFields} fieldsArray={eventFieldsArray} nestedArray={performanceFieldArray} nestedFields={performanceFields} nestedName={'performances'} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && <EventItem item={schematifyEvent(submission)} />}
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

export default AddEvent;