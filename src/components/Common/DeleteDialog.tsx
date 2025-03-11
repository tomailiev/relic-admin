import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";


const DeleteDialog = ({ open, setOpen, name, handleDelete }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, name: string, handleDelete: () => void }) => {

    const [textValue, setTextValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTextValue(e.target.value);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                Delete
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
                    Are you sure you want to delete {name}? Type "{name}" below to confirm
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
                <Button disabled={textValue !== name} onClick={handleDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;