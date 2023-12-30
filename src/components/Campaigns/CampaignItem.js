import { Email, Group, ShortText, Title } from "@mui/icons-material";
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, } from "@mui/material";
import { useState } from "react";
import SendDialog from "./SendDialog";
import { useSubmit } from "react-router-dom";

const CampaignItem = ({ item }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const submit = useSubmit();

    const handleCampaignSend = () => {
        submit({ campaignId: item.id }, { method: 'POST', encType: 'application/json' })
    }

    return (
        <>
            <SendDialog open={modalOpen} setOpen={setModalOpen} name={item.subject} handleSend={handleCampaignSend} />
            <Paper sx={{ mx: 8, my: 2, p: 5, }}>
                <Button variant="contained" fullWidth onClick={() => setModalOpen(true)}>Send...</Button>
                <Grid container spacing={2} my={3}>
                    <Grid item md={4} sm={4} xs={12}>
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
                                    <ListItemText primary={item.to} />
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
                    <Grid item md={6} sm={8} xs={12}>
                        <Container disableGutters>
                            <iframe title="emailHtml" srcDoc={item.html} style={{ height: '800px', width: '600px' }} />
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default CampaignItem;