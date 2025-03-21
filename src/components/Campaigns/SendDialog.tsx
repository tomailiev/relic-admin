import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from "react";
import { ActionDialog } from "../../types/dialog";


const SendDialog = ({ open, setOpen, name, handleSend }: ActionDialog & { name: string }) => {

    const [textValue, setTextValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTextValue(e.target.value);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Send Campaign...
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
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to send campaign {name}? Type "{name}" below to confirm
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm item name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={textValue !== name} onClick={() => handleSend()} autoFocus>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SendDialog;