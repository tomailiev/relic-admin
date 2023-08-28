import { Alert, Box, Button, Collapse, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useSubmit } from "react-router-dom";
import DonorItem from "./DonorItem";
import { donationFA, donorFA } from "../../vars/fieldArrays";
import SearchDonor from "./SearchDonor";
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";


const donorFields = {
    donations: '',
    firstName: '',
    lastName: '',
    email: '',
    recognitionName: '',
    address: '',
    location: '',
    phone: ''
};

const donationFields = {
    date: '',
    amount: '',
    campaign: '',
    comment: ''
};

const steps = [
    'Search donor',
    'Add donor',
    'Add donation',
    'Preview'
];

const AddDonation = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const [donor, setDonor] = useState(null);
    // const [existingDonor, setExistingDonor] = useState(false);
    const submit = useSubmit();
    const actionData = useActionData();

    // function handleDonorSubmission(data) {
    //     setDonor(data);
    //     console.log(data);
    // }

    // function handleSubmission(data) {
    //     setSubmission(data);
    // }

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: '/texts/add' })
    }

    return (
        <Box m={4}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel optional={label === 'Add donor' && <Typography variant="caption">Optional</Typography>}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            {activeStep === 0 &&
                <InstantSearch indexName="dev_donors" searchClient={searchClient}>
                    <SearchDonor donor={donor} handleDonor={setDonor} />
                </InstantSearch>}
            {activeStep === 1 &&
                <AddSimpleForm fields={donor || donorFields} fieldsArray={donorFA} handleFormCompletion={setDonor} />}
            {activeStep === 2 &&
                <AddSimpleForm fields={submission || donationFields} fieldsArray={donationFA} handleFormCompletion={setSubmission} />}
            {activeStep === 3 && submission && <DonorItem item={submission} />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev === 2 && donor.objectID ? prev - 2 : prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                    <Collapse in={!!actionData?.code}>
                        <Alert severity="error">
                            {actionData?.code}
                        </Alert>
                    </Collapse>
                </Box>
                {activeStep === 3
                    ? <Button variant="contained" onClick={finishSubmission}>
                        Finish
                    </Button>
                    : <Button variant="contained" onClick={() => setActiveStep(prev => prev === 0 && donor ? prev + 2 : prev + 1)} disabled={activeStep === 0 ? false : activeStep === 1 ? ! donor : !submission}>
                        {activeStep === 0 && !donor ? 'New Donor' : 'Next'}
                    </Button>
                }
            </Box>
        </Box>
    );
};

export default AddDonation;