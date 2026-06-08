import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Typography, } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddForm from "../Forms/AddForm";
import { donationAcknowledgementSchema } from "../../utils/yup/yup-schemas";
import { donationAcknowledgementProps } from "../../props/donationAcknowledgementProps";
import { CommonDialog, DonationInfo } from "../../types/dialog";
import { useEffect, useState } from "react";
import Tiptap from "../TipTap/Tiptap";


const ThankDialog = ({ open, setOpen, donationInfo, handleSend, }: CommonDialog & { donationInfo: DonationInfo | null, handleSend: (data: object) => void }) => {

    const [draftContent, setDraftContent] = useState('generic');
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [content, setContent] = useState('');

    const fields = {
        email: donationInfo?.email,
        from: 'toma@relicensemble.org',
        subject: donationInfo?.subject,
        // content: getThankYouContent(draftContent)
    };

    useEffect(() => {
        if (donationInfo && donationInfo.tier) {
            setDraftContent(['Dionysus $250+', 'Artemis $500+', 'Hermes $1000+', 'Apollo $5000+',].includes(donationInfo.tier) ? donationInfo.tier : 'generic');
        }
    }, [donationInfo]);

    useEffect(() => {
        function getThankYouContent(tier: string) {
            switch (tier) {
                case 'Dionysus $250+':
                    return donationInfo?.content['Dionysus']
                        .replaceAll('\\n', '\n')
                        .replaceAll('{recognitionName}', donationInfo?.recognitionName || '')
                        .replaceAll('{amount}', donationInfo?.amount.toString() || '')
                        .replaceAll('{email}', donationInfo?.email || '');
                case 'Artemis $500+':
                    return donationInfo?.content['Artemis']
                        .replaceAll('\\n', '\n')
                        .replaceAll('{recognitionName}', donationInfo?.recognitionName || '')
                        .replaceAll('{amount}', donationInfo?.amount.toString() || '')
                        .replaceAll('{email}', donationInfo?.email || '');
                case 'Hermes $1000+':
                    return donationInfo?.content['Hermes']
                        .replaceAll('\\n', '\n')
                        .replaceAll('{recognitionName}', donationInfo?.recognitionName || '')
                        .replaceAll('{amount}', donationInfo?.amount.toString() || '')
                        .replaceAll('{email}', donationInfo?.email || '');
                case 'Apollo $5000+':
                    return donationInfo?.content['Apollo']
                        .replaceAll('\\n', '\n')
                        .replaceAll('{recognitionName}', donationInfo?.recognitionName || '')
                        .replaceAll('{amount}', donationInfo?.amount.toString() || '')
                        .replaceAll('{email}', donationInfo?.email || '');
                default:
                    return donationInfo?.content['generic']
                        .replaceAll('\\n', '\n')
                        .replaceAll('{recognitionName}', donationInfo?.recognitionName || '')
                        .replaceAll('{amount}', donationInfo?.amount.toString() || '')
                        .replaceAll('{email}', donationInfo?.email || '');
            }
        }
        setContent(getThankYouContent(draftContent) || '');
    }, [draftContent, donationInfo]);


    function handleDraftSelectChange(e: SelectChangeEvent<string>) {
        setShouldUpdate(true);
        setDraftContent(e.target.value);
        setTimeout(() => {
            setShouldUpdate(false);
        }, 100);
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
                        <Typography py={1}><b>Sent:</b> {donationInfo.acknowledged.sent}</Typography>
                        <Typography py={1}><b>From:</b> {donationInfo.acknowledged.from}</Typography>
                        <Typography py={1}><b>To:</b> {donationInfo.acknowledged.to}</Typography>
                        <Typography py={1}><b>Subject:</b> {donationInfo.acknowledged.subject}</Typography>
                        <Typography pt={1} fontWeight={'bold'}>Content:</Typography>
                        <Tiptap content={donationInfo.acknowledged.content} inputName="Content" readOnly={true} onChange={(e => { })} />
                    </Paper>
                    : <>
                        <Select id="Draft-Select" name={"Draft-Select"} value={draftContent} onChange={handleDraftSelectChange} >
                            {
                                ['Dionysus $250+', 'Artemis $500+', 'Hermes $1000+', 'Apollo $5000+', 'generic'].map((option) => {
                                    return <MenuItem value={option} key={option}>{option}</MenuItem>
                                })
                            }
                        </Select>
                        {!shouldUpdate && <AddForm fieldsArray={donationAcknowledgementProps.fieldsArray} handleFormCompletion={handleSend} schema={donationAcknowledgementSchema} fields={{ ...fields, content }} />}
                    </>}
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