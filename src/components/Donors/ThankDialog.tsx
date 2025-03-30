import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Typography, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddForm from "../Forms/AddForm";
import { donationAcknowledgementSchema } from "../../utils/yup/yup-schemas";
import { donationAcknowledgementProps } from "../../props/donationAcknowledgementProps";
import { CommonDialog, DonationInfo } from "../../types/dialog";


const ThankDialog = ({ open, setOpen, donationInfo, handleSend, }: CommonDialog & { donationInfo: DonationInfo | null, handleSend: (data: object) => void }) => {

    const fields = {
        email: donationInfo?.email,
        from: '',
        subject: donationInfo?.subject,
        content: donationInfo?.content
            .replaceAll('\\n', '\n')
            .replace('{recognitionName}', donationInfo?.recognitionName)
            .replace('{amount}', donationInfo?.amount.toString())
    }

    return (
        <Dialog open={open} maxWidth={'lg'} fullWidth={true}>
            <DialogTitle>
                {donationInfo?.acknowledged ? 'View Thank You Email' : 'Send Thank You Email'}
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
                {donationInfo?.acknowledged
                    ? <Paper sx={{ p: 2 }}>
                        <Typography py={1}>Sent: {donationInfo.acknowledged.sent}</Typography>
                        <Typography py={1}>From: {donationInfo.acknowledged.from}</Typography>
                        <Typography py={1}>To: {donationInfo.acknowledged.to}</Typography>
                        <Typography py={1}>Subject: {donationInfo.acknowledged.subject}</Typography>
                        <Typography py={1}>Content: {donationInfo.acknowledged.content}</Typography>
                    </Paper>
                    : <AddForm fieldsArray={donationAcknowledgementProps.fieldsArray} handleFormCompletion={handleSend} schema={donationAcknowledgementSchema} fields={fields} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>{donationInfo?.acknowledged ? 'Close' : 'Cancel'}</Button>
                {/* <Button onClick={handleSend} autoFocus>
                    Send
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default ThankDialog;