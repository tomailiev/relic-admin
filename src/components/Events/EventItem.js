import { Avatar, Card, CardMedia, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, Link } from "@mui/material";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { useEffect, useState } from "react";
import { getLink } from "../../utils/firebase/firebase-functions";



const EventItem = ({ item }) => {

    const [imgSrc, setImgSrc] = useState(null);


    useEffect(() => {
        if (!item.imgSrc) {
            getLink(item.imageUrl)
                .then(url => setImgSrc(url));
        }
    }, [item])


    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {/* <CardActionArea> */}
                        <CardMedia
                            component="img"
                            // width="70%"
                            // height={150}
                            image={item.imgSrc || imgSrc}
                            alt="event image"
                        ></CardMedia>
                        {/* </CardActionArea> */}
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4" mb={2}>
                        {item.title}
                    </Typography>
                    <Typography variant="body1">
                        {item.description}
                    </Typography>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Performances:
                        </Typography>
                        <List>
                            {item.performances && item.performances.sort((a, b) => a.id - b.id).map(({ id, date, day, time, location, venue, url }) => {
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