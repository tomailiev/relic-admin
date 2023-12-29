import { Box, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddForm from "../Forms/AddForm";
import { campaignSchema } from "../../utils/yup/yup-schemas";


const EditCampaign = ({ itemType, fieldsArray, }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const { tags, campaign } = useLoaderData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function handleSubmision(item) {
        setSubmission(item)
    }

    function addTags(arr) {
        const arrCopy = JSON.parse(JSON.stringify(arr));
        const toField = arrCopy.find(item => item.id === 'to');
        toField.options = toField.options.concat(tags.map(([key]) => key));
        return arrCopy;
    }

    function finishSubmission() {
        // const formData = new FormData();
        // Object.entries(submission || campaign).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(submission || campaign, { method: 'POST', action: `/${itemType}/${campaign.id}/edit`, encType: 'application/json' })
    }

    return (
        <Box m={4}>
            <AddForm fields={!!submission ? submission : campaign} fieldsArray={addTags(fieldsArray)} handleFormCompletion={handleSubmision} schema={campaignSchema} />
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

export default EditCampaign;