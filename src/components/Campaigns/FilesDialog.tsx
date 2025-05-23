import { Button, Dialog, DialogContent, DialogTitle, IconButton, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from "react";
import { CommonDialog } from "../../types/dialog";
import LoadingContext from "../../context/LoadingContext";
import { getFileList } from "../../utils/firebase/firebase-functions";
import { publicStorage } from "../../utils/firebase/firebase-init";
import ErrorContext from "../../context/ErrorContext";


const FilesDialog = ({ open, setOpen, id }: CommonDialog & { id: string }) => {

    const { setIsLoading } = useContext(LoadingContext);
    const { setError } = useContext(ErrorContext);
    const [filesList, setFilesList] = useState<{ name: string, uri: string }[]>([]);

    useEffect(() => {
        if (open) {
            setIsLoading(true);
            getFileList(`/static/campaigns/${id}/`, publicStorage)
                .then(value => {
                    setIsLoading(false);
                    setFilesList(value.items.map(item => ({ name: item.name, uri: encodeURI(`https://storage.googleapis.com/${item.bucket}/${item.fullPath}`) })));
                })
                .catch(e => {
                    setIsLoading(false);
                    console.log(e);
                });
        } else {
            setTimeout(() => {
                setFilesList([]);
            }, 400);
        }

    }, [id, setIsLoading, open])

    function closeDialog() {
        setOpen(false);
    }

    function copyToClipboard(uri: string) {
        navigator.clipboard.writeText(uri)
            .then(() => {
                setError({ severity: 'success', message: 'Copied link', error: true })
            })
    }

    return (
        <Dialog open={open} maxWidth={'md'} fullWidth={true}>
            <DialogTitle>
                Files List
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
                {filesList.length
                    ? <List dense={false}>
                        {filesList.map(item => {
                            return <ListItem key={item.name} secondaryAction={<Button variant="outlined" onClick={() => copyToClipboard(item.uri)}>Copy</Button>}>
                                <ListItemText primary={<Link href={item.uri} target={'_blank'}>
                                    {item.name}
                                </Link>} />
                            </ListItem>
                        })}
                    </List>
                    : <Typography>No items</Typography>}
            </DialogContent>
        </Dialog>
    );
};

export default FilesDialog;