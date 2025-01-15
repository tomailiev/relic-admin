import { Box, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import ItemSwitch from "../Items/ItemSwitch";



const EditCSV = ({ itemType, formType, fieldsArray, nestedArray, nestedName, schematifyFn, deschematifyFn }) => {
    const { setError } = useContext(ErrorContext);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();
    const item = useLoaderData();
    // const navigate = useNavigate();
    const actionData = useActionData();

    useEffect(() => {
        if (actionData?.error) {
            setError(actionData);
        }
    }, [actionData, setError]);

    function finishSubmission() {
        submit(submission, { method: 'POST', action: `/${itemType}/${item.id}/edit`, encType: 'application/json' })
    }

    return (
        <Box m={4}>
            <ItemSwitch item={item} itemType={itemType} mutateItem={setSubmission} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto', mx: 5 }}>
                </Box>
                <Button variant="contained" onClick={finishSubmission}>
                    Import
                </Button>

            </Box>
        </Box>
    );
};

export default EditCSV;