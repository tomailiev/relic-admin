import { Box, Button, } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";


const NewTemplate = ({ itemType, fields, fieldsArray, }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [submission, setSubmission] = useState(null);
    const submit = useSubmit();


    function finishSubmission() {
        const formData = new FormData();
        Object.entries(submission).filter(([key,]) => key !== 'intent' && key !== 'imgSrc').forEach(([key, value]) => formData.append(key, value))
        submit(formData, { method: 'POST', action: `/${itemType}/add` })
    }

    return (
        <Box m={4}>
                <AddSimpleForm fields={submission || fields} fieldsArray={fieldsArray} handleFormCompletion={setSubmission} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(prev => prev - 1)}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }}>
                </Box>
                <Button variant="contained" onClick={finishSubmission} disabled={!submission}>
                    Edit content
                </Button>
            </Box>
        </Box>
    );
};

export default NewTemplate;