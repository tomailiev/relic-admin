import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import ItemSwitch from "./ItemSwitch";
import AddForm from "../Forms/AddForm";
import AddFile from "../Forms/AddFile";
import AddDynamic from "../Forms/AddDynamic";
import SubmissionContext from "../../context/SubmissionContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";


const AddItem = (itemProps) => {

    const [activeStep, setActiveStep] = useState(0);
    // const [submission, setSubmission] = useState(itemProps.nestedName ? { ...itemProps.fields, [itemProps.nestedName]: [itemProps.nestedFields] } : itemProps.fields);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const { submission, setSubmission } = useContext(SubmissionContext);
    const actionData = useActionData();

    const labels = {
        files: 'Upload files',
        fieldsArray: 'Fill out the fields',
        initialFieldsArray: 'Fill out the initial fields',
        nestedArray: `Add ${itemProps.nestedName}`,
        preview: 'Preview'
    }


    useEffect(() => {

        if (actionData?.error) {
            setError(actionData);
        }

        return () => setSubmission({});
        
    }, [actionData, setError, setSubmission]);




    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/${itemProps.itemType}/add`, encType: itemProps.encType })
    }

    async function handleFileSubmission(data) {
        const filePaths = {};
            await Promise.all(itemProps.filesFieldsArray.map(async (item) => {
                const filePath = await uploadFile(data[item.id], `${item.path}/${data[item.id]?.name}`);
                filePaths[item.id] = { path: filePath, file: data[item.id] };
                return item;
            }));
            setSubmission(prev => {
                return Object.assign(prev, filePaths);
            })
        handleSubmitEvent();
    }

    function handleObjectSubmission(data) {

        setSubmission(prev => {
            return Object.assign(prev, data);
        });
        handleSubmitEvent()
    }

    function handleArraySubmission(data) {
        setSubmission(prev => {
            return Object.assign(prev, { [itemProps.nestedName]: data });
        });
        handleSubmitEvent();
    }

    function handleSubmitEvent() {
        setTimeout(() => {
            setActiveStep(prev => ++prev);
        }, 1500);
    }

    const steps = {
        files: <AddFile fields={itemProps.filesFields} fieldsArray={itemProps.filesFieldsArray} schema={itemProps.schemas.files} handleFormCompletion={handleFileSubmission} />,
        fieldsArray: <AddForm fields={submission || itemProps.fields} fieldsArray={itemProps[itemProps.steps[activeStep]]} handleFormCompletion={handleObjectSubmission} schema={itemProps.schemas[itemProps.steps[activeStep]]} />,
        nestedArray: <AddDynamic fields={submission[itemProps.nestedName] ? submission[itemProps.nestedName] : [itemProps.nestedFields]} nestedArray={itemProps.nestedArray} nestedName={itemProps.nestedName} handleFormCompletion={handleArraySubmission} nestedLength={1} schema={itemProps.schemas[itemProps.steps[activeStep]]} blanks={itemProps.nestedFields} />,
        preview: <ItemSwitch item={submission} itemType={itemProps.itemType} mutateItem={setSubmission} />
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
            {steps[itemProps.steps[activeStep]]}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => --prev)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }}>
                </Box>
                {itemProps.steps[activeStep] === itemProps.steps.length - 1 &&
                    <Button variant="contained" onClick={finishSubmission}>
                        Finish
                    </Button>
                    // : <Button variant="contained" onClick={() => setActiveStep(prev => prev + 1)} disabled={!submission}>
                    //     Next
                    // </Button>
                }
            </Box>
        </Box>
    );
};

export default AddItem;