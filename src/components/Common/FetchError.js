import { useContext, useEffect } from "react";
import ErrorContext from "../../context/ErrorContext";
import { useActionData } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const FetchError = () => {
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    function formatErrorCode(errorCode) {
        return errorCode ? errorCode.replace('-', ' ') : '';
    }

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);


    return (
        <Container maxWidth={'lg'}>
            {actionData?.error && <Typography variant="h4" py={2} textTransform={'capitalize'}>{formatErrorCode(actionData?.code)}</Typography>}
        </Container>
    );
};

export default FetchError;