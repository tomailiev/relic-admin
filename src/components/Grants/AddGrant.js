import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import AddDynamicForm from "../Forms/AddDynamicForm";
import { grantsFA } from "../../vars/fieldArrays";
import ErrorContext from "../../context/ErrorContext";
import GrantItem from "./GrantItem";
import schematifyGrant from "../../vars/schematifyGrant";

const grantFields = {
    name: '',
    link: '',
    notification: '',
    // performances: []
};

const monthsFields = {
    month: '',
};

const steps = [
    'Add doc',
    'Preview'
];


const AddGrant = () => {

    const { setError } = useContext(ErrorContext);
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: '/grants/add' })
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
                <AddDynamicForm fields={submission || grantFields} fieldsArray={grantsFA} nestedArray={[{ label: 'Month', id: 'month', type: 'number' }]} nestedFields={monthsFields} nestedName={'dueMonths'} handleFormCompletion={setSubmission} />}
            {activeStep === 1 && submission && <GrantItem item={schematifyGrant(submission, 'dueMonths')} />}
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

export default AddGrant;