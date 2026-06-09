import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import { CommonDialog } from "../../types/dialog";
import AddFile from "../Forms/AddFile";
import { photoFileSchema } from "../../utils/yup/yup-schemas";
import LoadingContext from "../../context/LoadingContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { publicStorage } from "../../utils/firebase/firebase-init";
import hasProperty from "../../vars/hasProperty";
import UserContext from "../../context/UserContext";
import { useActionData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";


const AddAvatarDialog = ({ open, setOpen, }: CommonDialog) => {

    const { setError } = useContext(ErrorContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { profile, setProfile } = useContext(UserContext);
    const [newValue, setNewValue] = useState('');
    const actionData = useActionData() as { code: string, };
    const submit = useSubmit();

    async function handleFileSubmission(data: object | null) {
        if (!profile || !profile.id) return;

        try {
            const file = 'path'
            setIsLoading(true);

            if (data && hasProperty(data, file) && data[file]) {
                const filePath = await uploadFile(data[file] as File, `/static/profiles/${profile?.id}/${(data[file] as File).name}`, publicStorage);
                console.log(filePath);
                setNewValue(`https://storage.googleapis.com/${filePath}`);
                submit({ avatar: `https://storage.googleapis.com/${filePath}`, id: profile.id }, { encType: 'application/json', method: 'post' });
                setIsLoading(false);
                // setTextValue('Upload successful');
            }

        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError({ severity: 'error', message: 'Something went wrong', error: true })
        }
    }

    useEffect(() => {
        if (actionData) {
            if (actionData.code === 'success') {
                setOpen(false);
                setProfile(prev => ({ ...prev, avatar: newValue }))
                setError({ severity: 'success', message: 'Upload successful', error: true })
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
                File Upload
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
                <AddFile schema={photoFileSchema} handleFormCompletion={handleFileSubmission} filesFields={{ path: '' }} filesFieldsArray={[{ label: 'Avatar', id: 'path', type: 'file', path: `undefined`, displayName: 'file' }]} />
            </DialogContent>
        </Dialog>
    );
};

export default AddAvatarDialog;