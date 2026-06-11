import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CommonDialog } from "../../types/dialog";
import { userProfileSchema } from "../../utils/yup/yup-schemas";
import AddForm from "../Forms/AddForm";
import { UserData } from "../../types/DB";


const UpdateProfileDialog = ({ open, setOpen, handleSubmission, userData }: CommonDialog & { userData: UserData } & { handleSubmission: (data: Partial<UserData>) => void }) => {

    async function handleValueSubmission(data: object | null) {
        if (data) {
            handleSubmission(data);
        }
    }


    function closeDialog() {
        setOpen(false);
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
                <AddForm schema={userProfileSchema} handleFormCompletion={handleValueSubmission} fields={{ displayName: userData.displayName || '', email: userData.email || '' }} fieldsArray={[{ label: 'Name', id: 'displayName', }, { label: 'Email', id: 'email' }]} />
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;