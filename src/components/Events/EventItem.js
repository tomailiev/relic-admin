import { Avatar, Card, CardMedia, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, Link } from "@mui/material";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useLoaderData } from "react-router-dom";



const EventItem = () => {

    const event = useLoaderData();

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={event.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            // width="70%"
                            // height={150}
                            image={event.imgSrc}
                            alt="event dmage"
                        ></CardMedia>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4" mb={2}>
                        {event.title}
                    </Typography>
                    <Typography variant="body1">
                        {event.description}
                    </Typography>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Performances:
                        </Typography>
                        <List>
                            {event.performances.sort((a, b) => a.id - b.id).map(({ id, date, day, time, location, venue, url }) => {
                                return (
                                    <Link key={id} href={url} target={'_blank'} underline={'none'}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ConfirmationNumberOutlinedIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${venue} - ${location}`} secondary={`${day}, ${date} - ${time}`} />
                                        </ListItem>
                                    </Link>
                                )
                            })}
                        </List>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventItem;