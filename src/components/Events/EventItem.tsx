import { Avatar, Card, CardMedia, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, Link, Button } from "@mui/material";
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { daysOfWeek } from "../../vars/dateObjects";
import { useContext } from "react";
import ErrorContext from "../../context/ErrorContext";
import { EventItemProps } from "../../types/itemProps";
import { DeEvent, Event } from "../../types/DB";
// import { deschematifyPerformance } from "../../vars/deschematifyEvent";



const EventItem = ({ item }: { item: Event }) => {
    const { setError } = useContext(ErrorContext);

    function handleCopyText() {
        navigator.clipboard.writeText(`https://relicensemble.org/?dialog=programBook&eventId=${item.id}`)
            .then(() => {
                setError({ severity: 'success', message: 'Copied link', error: true })
            })
    }

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6} textAlign={'center'}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {/* <CardActionArea> */}
                        {item.imgSrc && <CardMedia
                            component="img"
                            // width="70%"
                            // height={150}
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="event image"
                        ></CardMedia>}
                        {/* </CardActionArea> */}
                    </Card>
                    {item.program && item.id && <Button sx={{ mt: 2 }} size={'large'} variant={'text'} onClick={handleCopyText} >Copy Program Book Link</Button>}

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
                            {item.performances && item.performances.sort((a, b) => Number(a.id) - Number(b.id)).map(({ id, date, time, location, venue, url }) => {
                                return (
                                    <Link key={id} href={url} target={'_blank'} underline={'none'}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ConfirmationNumberOutlinedIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${venue} - ${location}`} secondary={`${daysOfWeek[new Date(date).getUTCDay()]}, ${date} - ${time}`} />
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