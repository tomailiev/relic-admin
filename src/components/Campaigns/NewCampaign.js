import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddDynamicForm from "../Forms/AddDynamicForm";
import AddFileForm from "../Forms/AddFileForm";
import ItemSwitch from "../Items/ItemSwitch";


const NewCampaign = ({ itemType, formType, fields, fieldsArray, }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const tags = useLoaderData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);



    function addTags(arr) {
        const arrCopy = JSON.parse(JSON.stringify(arr));
        const toField = arrCopy.find(item => item.id === 'to');
        toField.options = toField.options.concat(tags);
        return arrCopy;
    }

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/${itemType}/add` })
    }

    return (
        <Box m={4}>
                <AddSimpleForm fields={submission || fields} fieldsArray={addTags(fieldsArray)} handleFormCompletion={setSubmission} />
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
                <Button variant="contained" onClick={finishSubmission}>
                    Edit content
                </Button>
            </Box>
        </Box>
    );
};

export default NewCampaign;