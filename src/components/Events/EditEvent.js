import { Alert, Box, Button, Collapse, Step, StepLabel, Stepper } from "@mui/material"
import { useCallback, useState } from "react";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import AddDynamicForm from "../Forms/AddDynamicForm";
import EventItem from "./EventItem";
import schematifyEvent from "../../vars/schematifyEvent";
import deschematifyEvent from "../../vars/deschematifyEvent";
import { eventFA, performanceFA } from "../../vars/fieldArrays";

// 'https://api.song.link/v1-alpha.1/links?url='


const steps = [
    'Edit doc',
    'Preview'
];


const EditEvent = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const item = useLoaderData();
    const navigate = useNavigate();
    const actionData = useActionData();


    const handleSubmission = useCallback((data) => {
        setSubmission(data);
        console.log(data);
    }, []);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/events/${item.id}/edit` })
    }

    function handleBack() {
        activeStep ? setActiveStep(prev => prev - 1) : navigate(`/events/${item.id}`);
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
            {activeStep === 0 && item &&
                <AddDynamicForm fields={submission || deschematifyEvent(item)} fieldsArray={eventFA} nestedArray={performanceFA} nestedLength={item?.performances.length} nestedName={'performances'} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && <EventItem item={schematifyEvent(submission)} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    {activeStep ? 'Back' : 'Cancel'}
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

export default EditEvent;