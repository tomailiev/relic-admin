import { useContext, useEffect } from "react";
import ErrorContext from "../../context/ErrorContext";
import { useActionData } from "react-router-dom";
import { Typography } from "@mui/material";

const DeleteItem = () => {
    const { setError } = useContext(ErrorContext);
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);


    return (
        actionData?.error && <Typography variant="h4" p={3}>{actionData?.code}</Typography>
    );
};

export default DeleteItem;