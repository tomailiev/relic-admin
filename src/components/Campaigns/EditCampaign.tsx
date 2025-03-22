import { Box, Button, Typography, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";
import AddForm from "../Forms/AddForm";
import { campaignSchema } from "../../utils/yup/yup-schemas";
import { FieldsArrayItem, ItemProps } from "../../types/fnProps";
import { Campaign, List } from "../../types/DB";
import { SubmitTarget } from "react-router-dom/dist/dom";


const EditCampaign = ({ itemType, fieldsArray }: ItemProps) => {
    const [submission, setSubmission] = useState<Campaign | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData() as AppErrorType;
    const { lists, campaign } = useLoaderData() as { lists: { value: string, display: string }[], campaign: Campaign };

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    useEffect(() => () => setSubmission(null), [setSubmission]);

    function handleObjectSubmission(data: Campaign) {

        setSubmission(prev => {
            return Object.assign(prev || {}, data);
        });
    }

    function addLists(arr: FieldsArrayItem[] | undefined) {
        const arrCopy: FieldsArrayItem[] | undefined = JSON.parse(JSON.stringify(arr));
        const toField = arrCopy?.find(item => item.id === 'to');
        if (toField && toField.options) {
            toField.options = toField.options.concat(lists);
        }
        return arrCopy;
    }

    function finishSubmission() {
        submit(JSON.stringify(submission) || JSON.stringify(campaign), { method: 'POST', action: `/${itemType}/${campaign.id}/edit`, encType: 'application/json' })
    }

    return (
        <Box m={4}>
            {
                campaign.status
                    ? <AddForm
                        fields={!!submission ? submission : campaign}
                        fieldsArray={addLists(fieldsArray)}
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