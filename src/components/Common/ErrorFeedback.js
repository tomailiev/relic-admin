import { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import { Alert, Snackbar } from "@mui/material";

const ErrorFeedback = () => {

    const { error, setError } = useContext(ErrorContext);
    function handleClose() {
        setError(null);
    }
    return (
        <Snackbar
            open={!!error}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}
            autoHideDuration={6000}
        >
            <Alert onClose={handleClose} severity={error?.severity} sx={{ width: '100%' }}>
                {error?.message || 'Something went'}
            </Alert>
        </Snackbar>
    );
};

export default ErrorFeedback;