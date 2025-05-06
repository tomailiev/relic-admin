import { Box, } from "@mui/material"
import { useContext, useEffect } from "react";
import { useActionData, useNavigate, } from "react-router-dom";
import SearchDonor from "./SearchDonor";
// @ts-ignore
import { InstantSearch } from "react-instantsearch";
import searchClient from "../../utils/algolia/algolia";
import ErrorContext, { AppErrorType } from "../../context/ErrorContext";

const AddDonation = () => {
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData() as AppErrorType;
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function handleSubmission(data: { objectID: string } | null) {
        navigate(data ? `/donors/${data.objectID}/edit` : '/donors/add');

    }


    return (
        <Box m={4}>
            <InstantSearch indexName="dev_donors" searchClient={searchClient}>
                <SearchDonor handleDonor={handleSubmission} />
            </InstantSearch>
        </Box>
    );
};

export default AddDonation;