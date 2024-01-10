import { Email, Group, ShortText, Title } from "@mui/icons-material";
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SendDialog from "./SendDialog";
import { useActionData, useSubmit } from "react-router-dom";
import TestDialog from "./TestDialog";
import ErrorContext from "../../context/ErrorContext";

const CampaignItem = ({ item, setEditable }) => {

    const { setError } = useContext(ErrorContext);
    const [sendModalOpen, setSendModalOpen] = useState(false);
    const [testModalOpen, setTestModalOpen] = useState(false);
    const [query, setQuery] = useState('desktop');
    const actionData = useActionData();
    const submit = useSubmit();

    useEffect(() => {
        if (!item.status) setEditable(false);
    }, [item.status, setEditable]);

    useEffect(() => {
        if (actionData) {
            console.log(actionData);
            setError(actionData);
            if (actionData.severity === 'success') {
                setSendModalOpen(false);
                setTestModalOpen(false);
            }
        }
    }, [actionData, setError]);

    const handleCampaignSend = (testAddresses) => {
        console.log('sending');
        submit(testAddresses ? { campaignId: item.id, testAddresses } : { campaignId: item.id }, { method: 'POST', encType: 'application/json' })
    }

    const handleQueryChange = (e, newQuery) => {
        setQuery(newQuery);
    }

    return (
        <>
            <SendDialog open={sendModalOpen} setOpen={setSendModalOpen} name={item.subject} handleSend={handleCampaignSend} />
            <TestDialog open={testModalOpen} setOpen={setTestModalOpen} handleSend={handleCampaignSend} />
            <Paper sx={{ mx: 8, my: 2, p: 5, }}>
                {item.status
                    ? <Stack spacing={2}>
                        <Button variant="contained" fullWidth onClick={() => setSendModalOpen(true)}>Send...</Button>
                        <Button variant="contained" fullWidth onClick={() => setTestModalOpen(true)}>Test...</Button>
                    </Stack>
                    : (
                        <>
                            <Button variant="contained" fullWidth onClick={() => setSendModalOpen(true)}>Resend...</Button>
                            <Grid container spacing={2} textAlign={'center'} p={2}>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Delivered</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.delivered?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Opened</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.open?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Clicked</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.click?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Rejected</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.reject?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Bounced</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.bounce?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6} lg={2}>
                                    <Paper>
                                        <Typography variant="h6">Unsubscribed</Typography>
                                        <Button variant="text"><Typography variant="body1">{item.unsubscribe?.length || 0}</Typography></Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </>
                    )
                }
                <Grid container spacing={2} my={3}>
                    <Grid item md={12} lg={4}>
                        <Container disableGutters>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Title />
                                    </ListItemIcon>
                                    <ListItemText primary={item.subject} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <ShortText />
                                    </ListItemIcon>
                                    <ListItemText primary={item.previewText} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Group />
                                    </ListItemIcon>
                                    <ListItemText primary={`${item.to} (${item.sentTo?.length || 'unknown number'})`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Email />
                                    </ListItemIcon>
                                    <ListItemText primary={item.from} />
                                </ListItem>
                            </List>
                        </Container>
                    </Grid>
                    <Grid item md={12} lg={8}>
                        <Container disableGutters sx={{ width: '100%', textAlign: 'center', pb: 2 }}>
                            <ToggleButtonGroup
                                value={query}
                                exclusive
                                onChange={handleQueryChange}
                                aria-label="media query"
                            >
                                <ToggleButton value="desktop" aria-label="Desktop" disabled={query === "desktop"}>
                                    Desktop
                                </ToggleButton>
                                <ToggleButton value="mobile" aria-label="Mobile" disabled={query === 'mobile'}>
                                    Mobile
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Container>
                        <Container disableGutters sx={{ textAlign: 'center' }}>
                            <iframe title="emailHtml" srcDoc={item.html} style={{ height: '800px', width: query === 'desktop' ? '800px' : '400px', maxWidth: '100%' }} />
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default CampaignItem;