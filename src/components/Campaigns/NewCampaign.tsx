import { Box, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";
import AddForm from "../Forms/AddForm";
import { ItemProps } from "../../types/fnProps";


const NewCampaign = (itemProps: ItemProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData() as AppErrorType;
    const lists = useLoaderData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    useEffect(() => () => setSubmission(null), [setSubmission]);


    function handleObjectSubmission(data) {

        setSubmission(prev => {
            return Object.assign(prev || {}, data);
        });
    }

    function addLists(arr = []) {
        const arrCopy = JSON.parse(JSON.stringify(arr));
        const toField = arrCopy.find(item => item.id === 'to');
        toField.options = toField.options.concat(lists);
        return arrCopy;
    }

    function finishSubmission() {
        submit(submission, { method: 'POST', action: `/${itemProps.itemType}/add`, encType: 'application/json' });
    }

    return (
        <Box m={4}>
            <AddForm
                fields={submission || itemProps.fields}
                fieldsArray={addLists(itemProps[itemProps.steps[activeStep]])}
                handleFormCompletion={handleObjectSubmission}
                schema={itemProps.schemas[itemProps.steps[activeStep]]}
            />
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
                <Button variant="contained" onClick={finishSubmission} disabled={!submission}>
                    Edit content
                </Button>
            </Box>
        </Box>
    );
};

export default NewCampaign;