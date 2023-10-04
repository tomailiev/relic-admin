import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import DonorItem from "./DonorItem";
import ErrorContext from "../../context/ErrorContext";
import donorProps from "../../props/donorProps";


const steps = [
    'Edit donor',
    'Preview'
];

const EditDonor = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const item = useLoaderData();
    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'donations').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/donors/${item.id}/edit` })
    }


    function handleBack() {
        activeStep ? setActiveStep(prev => prev - 1) : navigate(`/donors/${item.id}`);
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
                <AddSimpleForm fields={submission || item} fieldsArray={donorProps.fields} handleFormCompletion={setSubmission} />}
            {activeStep === 1 && submission &&
                <DonorItem item={{ ...submission, donations: item.donations, }} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    {activeStep ? 'Back' : 'Cancel'}
                </Button>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
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

export default EditDonor;