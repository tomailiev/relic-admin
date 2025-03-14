import { Email, Group, ShortText, Title } from "@mui/icons-material";
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SendDialog from "./SendDialog";
import { Link, useActionData, useSubmit } from "react-router-dom";
import TestDialog from "./TestDialog";
import ErrorContext from "../../context/ErrorContext";
import StatsDialog from "./StatsDialog";
import { openReducer, clickReducer, campaignStatSummarizer } from "../../props/campaignStatProps";


const CampaignItem = ({ item, setEditable }) => {

    const { setError } = useContext(ErrorContext);
    const [sendModalOpen, setSendModalOpen] = useState(false);
    const [testModalOpen, setTestModalOpen] = useState(false);
    const [statsModalOpen, setStatsModalOpen] = useState(false);
    const [statsList, setStatsList] = useState([]);
    const [statsName, setStatsName] = useState('');
    const [query, setQuery] = useState('desktop');
    const actionData = useActionData();
    const submit = useSubmit();

    useEffect(() => {
        if (!item.status) setEditable(false);
    }, [item.status, setEditable]);

    useEffect(() => {
        if (actionData) {
            setError(actionData);
            if (actionData.severity === 'success') {
                setSendModalOpen(false);
                setTestModalOpen(false);
            }
        }
    }, [actionData, setError]);

    const handleCampaignSend = (testAddresses) => {
        submit(testAddresses ? { campaignId: item.id, testAddresses } : { campaignId: item.id }, { method: 'POST', encType: 'application/json' })
    }

    const handleQueryChange = (e, newQuery) => {
        setQuery(newQuery);
    }

    const handleStatsDialogOpen = (name, list) => {
        setStatsList(list);
        setStatsName(name);
        setStatsModalOpen(true);
    }

    return (
        <>
            <SendDialog open={sendModalOpen} setOpen={setSendModalOpen} name={item.subject} handleSend={handleCampaignSend} />
            <TestDialog open={testModalOpen} setOpen={setTestModalOpen} handleSend={handleCampaignSend} />
            <StatsDialog open={statsModalOpen} setOpen={setStatsModalOpen} name={statsName} list={statsList} />
            <Paper sx={{ mx: 1, my: 2, py: 5, px: 2 }}>
                {item.status
                    ? <Stack spacing={2}>
                        <Button variant="contained" fullWidth onClick={() => setSendModalOpen(true)}>Send...</Button>
                        <Button variant="contained" fullWidth onClick={() => setTestModalOpen(true)}>Test...</Button>
                    </Stack>
                    : (
                        <Grid container spacing={2} textAlign={'center'} p={2}>
                            {/* <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Delivered</Typography>
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('delivered', item.delivered)} disabled={!(item.delivered?.length)}><Typography variant="body1">{item.delivered?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid> */}
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Opened</Typography>
                                    <Tooltip title={`${(item.open?.reduce(openReducer, []).length / item.sentTo?.length * 100).toFixed(1)}%`}>
                                        <Button variant="text" onClick={() => handleStatsDialogOpen('unique open', item.open?.reduce(openReducer, []))} disabled={!(item.open?.length)}><Typography variant="body1">{item.open?.reduce(openReducer, []).length || 0}</Typography></Button>
                                    </Tooltip>
                                    /
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('open', item.open)} disabled={!(item.open?.length)}><Typography variant="body1">{item.open?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Clicked</Typography>
                                    <Tooltip title={`${(item.click?.reduce(clickReducer, []).length / item.sentTo?.length * 100).toFixed(1)}%`}>
                                        <Button variant="text" onClick={() => handleStatsDialogOpen('unique click', item.click?.reduce(clickReducer, []))} disabled={!(item.click?.length)}><Typography variant="body1">{item.click?.reduce(clickReducer, []).length || 0}</Typography></Button>
                                    </Tooltip>
                                    /
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('click', item.click)} disabled={!(item.click?.length)}><Typography variant="body1">{item.click?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Rejected</Typography>
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('reject', item.reject)} disabled={!(item.reject?.length)}><Typography variant="body1">{item.reject?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Bounced</Typography>
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('bounce', item.bounce)} disabled={!(item.bounce?.length)}><Typography variant="body1">{item.bounce?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Unsubscribed</Typography>
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('unsubscribe', item.unsubscribe)} disabled={!(item.unsubscribe?.length)}><Typography variant="body1">{item.unsubscribe?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={2}>
                                <Paper>
                                    <Typography variant="h6">Spam</Typography>
                                    <Button variant="text" onClick={() => handleStatsDialogOpen('spam', item.spam)} disabled={!(item.spam?.length)}><Typography variant="body1">{item.spam?.length || 0}</Typography></Button>
                                </Paper>
                            </Grid>
                        </Grid>
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
                                    <ListItemText primary={item.components?.find(val => val.id === 'mj-preview')?.text} />
                                </ListItem>
                                {item.sentTo?.length
                                    ? <ListItemButton onClick={() => handleStatsDialogOpen('full', campaignStatSummarizer(item))}>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText primary={`${item.to} (${item.sentTo?.length || '0'})`} />
                                    </ListItemButton>
                                    : <Link to={item.to === 'All subscribers' ? '/subscribers' : `/lists/${item.to}`}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Group />
                                            </ListItemIcon>
                                            <ListItemText primary={item.to === 'All subscribers' ? 'All subscribers' : `List: ${item.to}`} />
                                        </ListItemButton>
                                    </Link>
                                }
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