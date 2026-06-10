import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import { CommonDialog } from "../../types/dialog";
import AddFile from "../Forms/AddFile";
import { photoFileSchema, userProfileSchema } from "../../utils/yup/yup-schemas";
import LoadingContext from "../../context/LoadingContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { publicStorage } from "../../utils/firebase/firebase-init";
import hasProperty from "../../vars/hasProperty";
import UserContext from "../../context/UserContext";
import { useActionData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import AddForm from "../Forms/AddForm";


const UpdateProfileDialog = ({ open, setOpen, }: CommonDialog) => {

    const { setError } = useContext(ErrorContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { profile, setProfile, currentUser } = useContext(UserContext);
    const [newValue, setNewValue] = useState<object | null>(null);
    const actionData = useActionData() as { code: string, };
    const submit = useSubmit();

    async function handleValueSubmission(data: object | null) {

        try {
            setIsLoading(true);

            if (data) {
                submit({ ...data, id: profile?.id || currentUser?.uid || '' }, { encType: 'application/json', method: 'post' });
                setNewValue(data);
                setIsLoading(false);
            }

        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError({ severity: 'error', message: 'Something went wrong', error: true })
        }
    }

    useEffect(() => {
        if (actionData) {
            if (actionData.code === 'Success') {
                setOpen(false);
                setProfile(prev => ({ ...prev, ...newValue }))
                setError({ severity: 'success', message: 'Profile update successful', error: true })
            } else {
                setError({ severity: 'error', message: 'Something went wrong', error: true })
            }
        }
    }, [actionData, setError, setOpen, setProfile, newValue]);

    function closeDialog() {
        setOpen(false);
        // setTimeout(() => {
        //     setTextValue('');
        // }, 400);
    }

    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>
                Profile Update
                <IconButton
                    aria-label="close"
                    onClick={closeDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AddForm schema={userProfileSchema} handleFormCompletion={handleValueSubmission} fields={{ displayName: profile?.displayName || '', email: profile?.email || '' }} fieldsArray={[{ label: 'Name', id: 'displayName', }, { label: 'Email', id: 'email' }]} />
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;