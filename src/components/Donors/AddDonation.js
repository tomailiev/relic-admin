import { Box, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
// import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, } from "react-router-dom";
import SearchDonor from "./SearchDonor";
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";
// import DonationItem from "./DonationItem";
import ErrorContext from "../../context/ErrorContext";
import donorProps from "../../props/donorProps";
// import SubmissionContext from "../../context/SubmissionContext";
import AddItem from "../Items/AddItem";
import EditItem from "../Items/EditItem";


// const steps = [
//     'Search donor',
//     'Add donor',
//     'Add donation',
//     'Preview'
// ];

const AddDonation = () => {
    const [submissionType, setSubmissionType] = useState('');
    // const { submission, setSubmission } = useContext(SubmissionContext);
    // const [donor, setDonor] = useState(null);
    // const [hasSearched, setHasSearched] = useState(false); //refactor
    // const [existingDonor, setExistingDonor] = useState(false);
    // const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function handleSubmission(data) {
        console.log(data);
        setSubmissionType(data ? 'edit' : 'add');
        // setSubmission(prev => {
        //     return Object.assign(prev, data);
        // });
        // setActiveStep(prev => ++prev);
        // handleSubmitEvent()
    }

    // function finishSubmission() {
    //     const formData = new FormData();
    //     Object.entries(donor).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
    //     Object.entries(submission).filter(([key,]) => key !== 'intent').forEach(([key, value]) => formData.append(key, value))
    //     submit(formData, { method: 'POST', action: '/donors/add-donation' })
    // }

    return (
        <>
            {!submissionType ? <Box m={4}>
                <InstantSearch indexName="dev_donors" searchClient={searchClient}>
                    <SearchDonor handleDonor={handleSubmission} />
                </InstantSearch>
                {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={() => setActiveStep(1)}
                        disabled={!hasSearched}
                    >
                        {!submission.objectID ? 'New Donor' : 'Edit Donor'}
                    </Button>
                </Box> */}
            </Box>
                : submissionType === 'add'
                    ? <AddItem {...donorProps} />
                    : <EditItem {...donorProps} />
            }
        </>
    );
};

export default AddDonation;