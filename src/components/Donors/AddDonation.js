import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useSubmit } from "react-router-dom";
import SearchDonor from "./SearchDonor";
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";
import DonationItem from "./DonationItem";
import ErrorContext from "../../context/ErrorContext";
import donorProps from "../../props/donorProps";


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
    const [hasSearched, setHasSearched] = useState(false);
    // const [existingDonor, setExistingDonor] = useState(false);
    const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        const formData = new FormData();
        Object.entries(donor).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: '/donors/add-donation' })
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
                    <SearchDonor donor={donor} handleDonor={setDonor} setSearchStatus={setHasSearched} />
                </InstantSearch>}
            {activeStep === 1 &&
                <AddSimpleForm fields={donor || donorProps.fields} fieldsArray={donorProps.fieldsArray} handleFormCompletion={setDonor} />}
            {activeStep === 2 &&
                <AddSimpleForm fields={submission || donorProps.nestedFields} fieldsArray={donorProps.nestedArray} handleFormCompletion={setSubmission} />}
            {activeStep === 3 && submission && <DonationItem donation={submission} donor={donor} />}
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
                </Box>
                {activeStep === 3
                    ? <Button variant="contained" onClick={finishSubmission}>
                        Finish
                    </Button>
                    : <Button
                        variant="contained"
                        onClick={() => setActiveStep(prev => prev === 0 && donor ? prev + 2 : prev + 1)}
                        disabled={activeStep === 0 ? !hasSearched : activeStep === 1 ? !donor : activeStep === 2 ? !submission : false}
                    >
                        {activeStep === 0 && !donor ? 'New Donor' : 'Next'}
                    </Button>
                }
            </Box>
        </Box>
    );
};

export default AddDonation;