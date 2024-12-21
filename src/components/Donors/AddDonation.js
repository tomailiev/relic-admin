import { Box, } from "@mui/material"
import { useContext, useEffect } from "react";
// import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useNavigate, } from "react-router-dom";
import SearchDonor from "./SearchDonor";
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";
// import DonationItem from "./DonationItem";
import ErrorContext from "../../context/ErrorContext";
// import donorProps from "../../props/donorProps";
// import SubmissionContext from "../../context/SubmissionContext";
// import AddItem from "../Items/AddItem";
// import EditItem from "../Items/EditItem";


// const steps = [
//     'Search donor',
//     'Add donor',
//     'Add donation',
//     'Preview'
// ];

const AddDonation = () => {
    // const { submission, setSubmission } = useContext(SubmissionContext);
    // const [donor, setDonor] = useState(null);
    // const [hasSearched, setHasSearched] = useState(false); //refactor
    // const [existingDonor, setExistingDonor] = useState(false);
    // const submit = useSubmit();
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function handleSubmission(data) {
        console.log(data);
        navigate(data ? `/donors/${data.objectID}/edit` : '/donors/add');
       
    }


    return (
        <Box m={4}>
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
    );
};

export default AddDonation;