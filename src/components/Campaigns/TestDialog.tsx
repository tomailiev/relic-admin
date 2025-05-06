import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from "react";
import { CommonDialog } from "../../types/dialog";


const TestDialog = ({ open, setOpen, handleSend }: CommonDialog & { handleSend: (textValue: string) => void }) => {

    const [textValue, setTextValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTextValue(e.target.value);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Send Test...
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
                    Type email addresses you want to send this test to, separated by a comma
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Add emails"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    size="small"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={!textValue} onClick={() => handleSend(textValue)} autoFocus>
                    Send test
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TestDialog;