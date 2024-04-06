import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddForm from "../Forms/AddForm";
import { donationAcknowledgementSchema } from "../../utils/yup/yup-schemas";
import { donationAcknowledgementProps } from "../../props/donationAcknowledgementProps";


const ThankDialog = ({ open, setOpen, donationInfo, handleSend, }) => {

    const fields = {
        email: donationInfo?.email,
        from: '',
        subject: donationInfo?.subject,
        content: donationInfo?.content
            .replaceAll('\\n', '\n')
            .replace('{recognitionName}', donationInfo?.recognitionName)
            .replace('{amount}', donationInfo?.amount)
    }

    return (
        <Dialog open={open} maxWidth={'lg'} fullWidth="true">
            <DialogTitle>
                Send Thank You Email
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
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
                <AddForm fieldsArray={donationAcknowledgementProps.fieldsArray} handleFormCompletion={handleSend} schema={donationAcknowledgementSchema} fields={fields} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                {/* <Button onClick={handleSend} autoFocus>
                    Send
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default ThankDialog;