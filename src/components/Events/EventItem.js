import { Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardMedia, Grid, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const EventItem = ({ event }) => {
    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={event.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
                // left: `${(position < 0 && position !== -(length - 1)) || isShifting ? 150 : position === 1 || position === -(length - 1) ? -150 : 0}%`,
                // top: 0,
                // width: position ? '0px' : 'calc(100% + 16px)',
                // transition: Math.abs(position) === 1 || Math.abs(position) === length - 1? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : !position ? 'left 1s ease-in, width 100ms ease-in' : 'none',
                // visibility: position ? 'hidden' : 'visible',
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
                    <Typography variant="h6">
                        Title: {event.title}
                    </Typography>
                    <Typography variant="body1">
                        Description: {event.description}
                    </Typography>
                    <Typography variant="body1">
                        Performances:
                    </Typography>
                    {event.performances.sort((a, b) => a.id - b.id).map(({ date, day, id, location, venue, time, url }) => {
                        return <Accordion key={url}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{ width: '100%' }}
                            >
                                <Typography variant="body1">
                                    {day}, {date} - {time}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1">
                                    Id: {id}
                                </Typography>
                                <Typography variant="body1">
                                    Venue & Location: {venue}, {location}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    })}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventItem;