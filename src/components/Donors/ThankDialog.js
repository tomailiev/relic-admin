import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddForm from "../Forms/AddForm";
import { donationAcknowledgementSchema } from "../../utils/yup/yup-schemas";
import { donationAcknowledgementProps } from "../../props/donationAcknowledgementProps";


const ThankDialog = ({ open, setOpen, donationInfo, handleSend }) => {

    const emailText = `Dear ${donationInfo?.recognitionName},

Thank you for supporting Relic! Your donation of $${donationInfo?.amount} means the world to us! Through generous sponsors such as yourself, we are able to cover operating expenses, pay our musicians, and continue to pursue our mission of sharing the joy of early music with communities across the country.
    
With endless gratitude,
The Relic team:
Aniela, Cullen, Kako, Natalie, Rebecca, and Toma`;

    const subject = 'Thank you for supporting Relic!';

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
                <AddForm fieldsArray={donationAcknowledgementProps.fieldsArray} handleFormCompletion={handleSend} schema={donationAcknowledgementSchema} fields={{ email: donationInfo?.email, from: '', subject, content: emailText }} />
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