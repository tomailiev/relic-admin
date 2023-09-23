import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useCallback, useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import AddDynamicForm from "../Forms/AddDynamicForm";
import schematifyEvent from "../../vars/schematifyEvent";
import deschematifyEvent from "../../vars/deschematifyEvent";
import { grantsFA } from "../../vars/fieldArrays";
import ErrorContext from "../../context/ErrorContext";
import GrantItem from "./GrantItem";
import { deschematify } from "../../vars/schemaFunctions";
import schematifyGrant from "../../vars/schematifyGrant";
import deschematifyGrant from "../../vars/deschematifyGrant";


const steps = [
    'Edit doc',
    'Preview'
];


const EditGrant = () => {
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

    const handleSubmission = useCallback((data) => {
        setSubmission(data);
        console.log(data);
    }, []);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/grants/${item.id}/edit` })
    }

    function handleBack() {
        activeStep ? setActiveStep(prev => prev - 1) : navigate(`/grants/${item.id}`);
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
                <AddDynamicForm fields={submission || deschematifyGrant(item)} fieldsArray={grantsFA} nestedArray={[{ label: 'Month', id: 'month', type: 'number' }]} nestedLength={item?.dueMonths.length} nestedName={'dueMonths'} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && <GrantItem item={schematifyGrant(submission)} />}
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

export default EditGrant;