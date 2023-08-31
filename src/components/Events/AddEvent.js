import { Alert, Box, Button, Collapse, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import AddDynamicForm from "../Forms/AddDynamicForm";
import EventItem from "./EventItem";
import schematifyEvent from "../../vars/schematifyEvent";
import { eventFA, performanceFA } from "../../vars/fieldArrays";

const eventFields = {
    dateDone: '',
    description: '',
    imageUrl: '',
    title: '',
    // performances: []
};

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

const steps = [
    'Add doc',
    'Preview'
];


const AddEvent = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const actionData = useActionData();

    // const handleSubmission = useCallback((data) => {
    //     setSubmission(data);
    //     console.log(data);
    // }, []);

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
                <AddDynamicForm fields={submission || eventFields} fieldsArray={eventFA} nestedArray={performanceFA} nestedFields={performanceFields} nestedName={'performances'} handleFormCompletion={setSubmission} />}
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

export default AddEvent;