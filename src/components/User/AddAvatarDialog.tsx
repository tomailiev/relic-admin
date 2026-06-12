import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, } from "react";
import { CommonDialog } from "../../types/dialog";
import AddFile from "../Forms/AddFile";
import { photoFileSchema } from "../../utils/yup/yup-schemas";
import LoadingContext from "../../context/LoadingContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { publicStorage } from "../../utils/firebase/firebase-init";
import hasProperty from "../../vars/hasProperty";
import UserContext from "../../context/UserContext";
import ErrorContext from "../../context/ErrorContext";
import { UserData } from "../../types/DB";


const AddAvatarDialog = ({ open, setOpen, userData, handleSubmission }: CommonDialog & { userData: UserData } & { handleSubmission: (data: Partial<UserData>) => void }) => {

    const { setError } = useContext(ErrorContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { currentUser } = useContext(UserContext);

    async function handleFileSubmission(data: object | null) {

        try {
            const file = 'path'
            setIsLoading(true);

            if (data && hasProperty(data, file) && data[file]) {
                const filePath = await uploadFile(data[file] as File, `/static/profiles/${currentUser?.uid}/${(data[file] as File).name}`, publicStorage);
                console.log(filePath);
                setIsLoading(false);
                handleSubmission({ avatar: `https://storage.googleapis.com/${filePath}` });
                // setTextValue('Upload successful');
            }

        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError({ severity: 'error', message: 'Something went wrong', error: true })
        }
    }


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