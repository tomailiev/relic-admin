import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import ItemSwitch from "./ItemSwitch";
import AddDynamicForm from "../Forms/AddDynamicForm";
import AddFileForm from "../Forms/AddFileForm";
import AddForm from "../Forms/AddForm";


// const steps = [
//     'Add doc',
//     'Preview'
// ];

// const itemProps = {
//     itemType,
//     formType,
//     fields,
//     fieldsArray,
//     initialFieldsArray,
//     nestedFields,
//     nestedArray,
//     nestedName,
//     schematifyFn,
//     encType,
//     steps
// }

const AddItem = (itemProps) => {

    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    const labels = {
        fieldsArray: 'Fill out the fields',
        initialFieldsArray: 'Fill out the initial fields',
        nestedArray: `Add ${itemProps.nestedName}`,
        preview: 'Preview'
    }

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/${itemProps.itemType}/add`, encType: itemProps.encType })
    }

    return (
        <Box m={4}>
            <Stepper activeStep={activeStep}>
                {itemProps.steps?.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{labels[label]}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep !== itemProps.steps.length - 1
                ? <AddForm fields={submission || itemProps.fields} fieldsArray={submission || itemProps[itemProps.steps[activeStep]]} handleFormCompletion={setSubmission} schema={itemProps[itemProps.steps[activeStep]]} />
                : <ItemSwitch item={submission} itemType={itemProps.itemType} mutateItem={setSubmission} />
            }
            {/* {activeStep === 0 && formType === 'simple' &&
                <AddSimpleForm fields={submission || fields} fieldsArray={submission ? fieldsArray : initialFieldsArray || fieldsArray} handleFormCompletion={setSubmission} />}
            {activeStep === 0 && formType === 'dynamic' &&
                <AddDynamicForm fields={submission || fields} fieldsArray={submission ? fieldsArray : initialFieldsArray || fieldsArray} nestedArray={nestedArray} nestedFields={nestedFields} nestedName={nestedName} handleFormCompletion={setSubmission} />}
            {activeStep === 0 && formType === 'file' &&
                <AddFileForm fields={submission || fields} fieldsArray={submission ? fieldsArray : initialFieldsArray || fieldsArray} handleFormCompletion={setSubmission} />}
            {activeStep === 1 && submission && formType === 'simple' && <ItemSwitch item={submission} itemType={itemType} mutateItem={setSubmission} />}
            {activeStep === 1 && submission && formType === 'file' && <ItemSwitch item={submission} itemType={itemType} mutateItem={setSubmission} />}
            {activeStep === 1 && submission && formType === 'dynamic' && <ItemSwitch item={schematifyFn(submission)} itemType={itemType} mutateItem={setSubmission} />} */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }}>
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

export default AddItem;