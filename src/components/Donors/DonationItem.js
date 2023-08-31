import { Container, Grid, List, ListItem, ListItemText, Paper, Typography, ListItemIcon } from "@mui/material";
import { CalendarToday, Campaign, Comment, Paid, } from "@mui/icons-material";
import DonorFields from "./DonorFields";



const DonationItem = ({ donor, donation }) => {


    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Donor:
                        </Typography>
                        <DonorFields donor={donor} />
                    </Container>
                </Grid>
                <Grid item md={6}>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Donation:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CalendarToday />
                                </ListItemIcon>
                                <ListItemText primary={donation.date} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Paid />
                                </ListItemIcon>
                                <ListItemText primary={`$${donation.amount}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Campaign />
                                </ListItemIcon>
                                <ListItemText primary={`${donation.campaign} donation`} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Comment />
                                </ListItemIcon>
                                <ListItemText primary={donation.comment} />
                            </ListItem>
                        </List>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DonationItem;