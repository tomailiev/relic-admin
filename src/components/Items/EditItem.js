import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import MusicianItem from "./MusicianItem";
import { useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { musicianFA } from "../../vars/fieldArrays";
import ErrorContext from "../../context/ErrorContext";
import ItemSwitch from "./ItemSwitch";


const steps = [
    'Edit doc',
    'Preview'
];

const EditItem = ({ itemType, formType, fieldsArray, nestedArray, nestedName, schematifyFn, deschematifyFn }) => {
    const { setError } = useContext(ErrorContext);
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const item = useLoaderData();
    const navigate = useNavigate();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/${itemType}/${item.id}/edit` })
    }

    function handleBack() {
        activeStep ? setActiveStep(prev => prev - 1) : navigate(`/${itemType}/${item.id}`);
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
            {activeStep === 0 && item && formType === 'simple' &&
                <AddSimpleForm fields={submission || item} fieldsArray={fieldsArray} handleFormCompletion={setSubmission} />}
            {activeStep === 0 && item && formType === 'dynamic' &&
                <AddDynamicForm fields={submission || deschematifyFn(item)} fieldsArray={fieldsArray} nestedArray={nestedArray} nestedLength={item[nestedName].length} nestedName={nestedName} handleFormCompletion={handleSubmission} />}
            {activeStep === 1 && submission && formType === 'simple' && <ItemSwitch item={submission} />}
            {activeStep === 1 && submission && formType === 'dynamic' && <ItemSwitch item={schematifyFn(submission)} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    // disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    {activeStep === 0 ? 'Cancel' : 'Back'}
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

export default EditItem;