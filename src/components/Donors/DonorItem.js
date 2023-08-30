import { Avatar, Card, CardMedia, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, Link } from "@mui/material";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { createRef, useEffect } from "react";
import loader from "../../utils/google-maps/maps-init";
import getMap from "../../utils/google-maps/getMap";



const DonorItem = ({ item }) => {
    const mapRef = createRef();

    useEffect(() => {
        getMap(mapRef.current, item.address, item.location)
            .then(console.log('done'))
            .catch(e => console.log(e))
    }, []);

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    {/* <Card sx={{ textDecoration: 'none' }}>
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            // width="70%"
                            // height={150}
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="event image"
                        ></CardMedia>
                        </CardActionArea>
                    </Card> */}
                    <Container ref={mapRef} sx={{ width: '100%', height: '300px', borderRadius: '4px' }} />
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4" mb={2}>
                        {item.firstName} {item.lastName}
                    </Typography>
                    <Typography variant="body1">
                        {item.email}
                    </Typography>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Donations:
                        </Typography>
                        <List>
                            {item.donations && item.donations.sort((a, b) => b.date.localeCompare(a.date)).map(({ id, date, amount, campaign }) => {
                                return (
                                    <ListItem key={id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ConfirmationNumberOutlinedIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`$${amount} donated on ${date}`} secondary={campaign} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DonorItem;