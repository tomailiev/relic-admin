import { Box, Button, Typography, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddForm from "../Forms/AddForm";
import { campaignSchema } from "../../utils/yup/yup-schemas";


const EditCampaign = ({ itemType, fieldsArray, }) => {
    const [submission, setSubmission] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const { tags, campaign } = useLoaderData();

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

    function addTags(arr) {
        const arrCopy = JSON.parse(JSON.stringify(arr));
        const toField = arrCopy.find(item => item.id === 'to');
        toField.options = toField.options.concat(tags.map(([key]) => key));
        return arrCopy;
    }

    function finishSubmission() {
        submit(submission || campaign, { method: 'POST', action: `/${itemType}/${campaign.id}/edit`, encType: 'application/json' })
    }

    return (
        <Box m={4}>
            {
                campaign.status
                    ? <AddForm
                        fields={!!submission ? submission : campaign}
                        fieldsArray={addTags(fieldsArray)}
                        handleFormCompletion={handleObjectSubmission}
                        schema={campaignSchema}
                    />
                    : <Box height={'400px'}><Typography textAlign={'center'} variant="h5">Campaign was already sent and cannot be edited</Typography></Box>
            }
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
                <Button variant="contained" onClick={finishSubmission} disabled={!campaign.status}>
                    Edit content
                </Button>
            </Box>
        </Box>
    );
};

export default EditCampaign;