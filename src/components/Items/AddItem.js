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

    }, [actionData, setError]);

    useEffect(() => () => setSubmission({}), [setSubmission]);

    function finishSubmission() {
        submit(submission, { method: 'POST', action: `/${itemProps.itemType}/add`, encType: 'application/json' })
    }

    async function handleFileSubmission(data) {
        const filePaths = {};
        try {
            await Promise.all(itemProps.filesFieldsArray.map(async (item) => {
                const filePath = await uploadFile(data[item.id], `${item.path}/${data[item.id]?.name}`);
                filePaths[item.id] = filePath;
                filePaths[item.displayName] = data[item.id];
                return item;
            }));
            setSubmission(prev => {
                return Object.assign(prev, filePaths);
            })
            handleSubmitEvent();
        } catch (error) {
            console.log(error);

        }
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

    async function handleInitialSubmission(initialData) {

        try {
            const { data } = await itemProps.initialFn(initialData);

            setSubmission(prev => {
                return Object.assign(prev, data);
            });
            setTimeout(() => {
                handleSubmitEvent();
                
            }, 1000);

        } catch (error) {
            console.log(error);

        }
    }

    function handleSubmitEvent() {
        setActiveStep(prev => ++prev);

    }

    const steps = {
        files: <AddFile fields={submission || itemProps.filesFields} fieldsArray={itemProps.filesFieldsArray} schema={itemProps.schemas.files} handleFormCompletion={handleFileSubmission} />,
        initialFieldsArray: <AddForm fields={itemProps.initialFields} fieldsArray={itemProps.initialFieldsArray} schema={itemProps.schemas.initialFieldsArray} handleFormCompletion={handleInitialSubmission} />,
        fieldsArray: <AddForm fields={submission || itemProps.fields} fieldsArray={itemProps[itemProps.steps[activeStep]]} handleFormCompletion={handleObjectSubmission} schema={itemProps.schemas[itemProps.steps[activeStep]]} />,
        nestedArray: <AddDynamic fields={submission[itemProps.nestedName] ? submission[itemProps.nestedName] : [itemProps.nestedFields]} nestedArray={itemProps.nestedArray} nestedName={itemProps.nestedName} handleFormCompletion={handleArraySubmission} nestedLength={1} schema={itemProps.schemas[itemProps.steps[activeStep]]} blanks={itemProps.nestedFields} />,
        preview: <ItemSwitch item={submission} itemType={itemProps.itemType} />
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
                {activeStep === itemProps.steps.length - 1 &&
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