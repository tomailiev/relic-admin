import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { CommonDialog } from "../../types/dialog";
import AddFile from "../Forms/AddFile";
import { publicFileSchema } from "../../utils/yup/yup-schemas";
import LoadingContext from "../../context/LoadingContext";
import { uploadFile } from "../../utils/firebase/firebase-functions";
import { publicStorage } from "../../utils/firebase/firebase-init";
import hasProperty from "../../vars/hasProperty";


const AddFileDialog = ({ open, setOpen, id }: CommonDialog & { id: string }) => {

    const { setIsLoading } = useContext(LoadingContext);
    const [textValue, setTextValue] = useState('');

    async function handleFileSubmission(data: object | null) {

        try {
            const file = 'file'
            setIsLoading(true);
            if (data && hasProperty(data, file) && data[file]) {
                const filePath = await uploadFile(data[file] as File, `/static/campaigns/${id}/${(data[file] as File).name}`, publicStorage);
                console.log(filePath);
                setIsLoading(false);
                setTextValue('Upload successful');
            }

            // handleSubmitEvent();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setTextValue('Something went wrong')
        }
    }

    function closeDialog() {
        setOpen(false);
        setTimeout(() => {
            setTextValue('');
        }, 400);
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
                {
                    textValue
                        ? <Typography>{textValue}</Typography>
                        : <AddFile schema={publicFileSchema} handleFormCompletion={handleFileSubmission} filesFields={{ file: '' }} filesFieldsArray={[{ label: 'File', id: 'file', type: 'file', path: `undefined`, displayName: 'file' }]} />
                }
            </DialogContent>
        </Dialog>
    );
};

export default AddFileDialog;