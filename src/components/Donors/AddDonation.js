import { Box, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
// import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, } from "react-router-dom";
import SearchDonor from "./SearchDonor";
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";
// import DonationItem from "./DonationItem";
import ErrorContext from "../../context/ErrorContext";
import donorProps from "../../props/donorProps";
import SubmissionContext from "../../context/SubmissionContext";
import AddItem from "../Items/AddItem";


// const steps = [
//     'Search donor',
//     'Add donor',
//     'Add donation',
//     'Preview'
// ];

const AddDonation = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { submission, setSubmission } = useContext(SubmissionContext);
    // const [donor, setDonor] = useState(null);
    const [hasSearched, setHasSearched] = useState(false); //refactor
    // const [existingDonor, setExistingDonor] = useState(false);
    // const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    // function finishSubmission() {
    //     const formData = new FormData();
    //     Object.entries(donor).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
    //     Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
    //     submit(formData, { method: 'POST', action: '/donors/add-donation' })
    // }

    return (
        <>
            {!activeStep ? <Box m={4}>
                <InstantSearch indexName="dev_donors" searchClient={searchClient}>
                    <SearchDonor donor={submission} handleDonor={setSubmission} setSearchStatus={setHasSearched} />
                </InstantSearch>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => setActiveStep(1)}
                        disabled={!hasSearched}
                    >
                        {!submission ? 'New Donor' : 'Next'}
                    </Button>
                </Box>
            </Box>
                : <AddItem {...donorProps} />}
        </>
    );
};

export default AddDonation;