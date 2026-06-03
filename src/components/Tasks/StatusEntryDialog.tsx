import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Typography, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddForm from "../Forms/AddForm";
import { donationAcknowledgementSchema, taskStatusUpdateSchema } from "../../utils/yup/yup-schemas";
import { donationAcknowledgementProps } from "../../props/donationAcknowledgementProps";
import { CommonDialog, DonationInfo } from "../../types/dialog";
import { useEffect, useState } from "react";


const StatusEntryDialog = ({ open, setOpen, handleSend, }: CommonDialog & { handleSend: (data: object) => void }) => {

    const fields = {
        entry: '',
    };

    return (
        <Dialog open={open} maxWidth={'lg'} fullWidth={true}>
            <DialogTitle>
                Add Entry
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
                <AddForm fieldsArray={[{ label: 'Status Entry', id: 'entry', multiline: true }]} handleFormCompletion={handleSend} schema={taskStatusUpdateSchema} fields={fields} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
                {/* <Button onClick={handleSend} autoFocus>
                    Send
                </Button> */}
            </DialogActions>
        </Dialog>
    );
};

export default StatusEntryDialog;