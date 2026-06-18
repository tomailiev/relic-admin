import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { CommonDialog, } from "../../types/dialog";


const ArchiveConfirmDialog = ({ open, setOpen, handleConfirm, id }: CommonDialog & { id: string, handleConfirm: (id: string) => void }) => {

    return (
        <Dialog open={open} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>
                Are you sure?
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
                    Are you sure you want to archive task? This action cannot be undone.
                </DialogContentText>
                {/* <AddForm fieldsArray={[{ label: 'Status Entry', id: 'entry', multiline: true }]} handleFormCompletion={handleSend} schema={taskStatusUpdateSchema} fields={fields} /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => handleConfirm(id)} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ArchiveConfirmDialog;