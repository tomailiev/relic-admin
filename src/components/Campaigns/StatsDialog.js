import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const StatsDialog = ({ open, setOpen, name, list }) => {

    return (
        <Dialog open={open}>
            <DialogTitle sx={{ textTransform: 'capitalize' }}>
                {name} stats
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
                {list.map((item, i) => {
                    return <DialogContentText key={i} id="alert-dialog-description">
                        {name === 'click' ? `${item.email}: ${item.link}` : item}
                    </DialogContentText>

                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatsDialog;