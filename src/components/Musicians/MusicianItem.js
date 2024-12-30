import { Card, CardMedia, Grid, Paper, Typography } from "@mui/material";

const MusicianItem = ({ item }) => {

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Card sx={{ textDecoration: 'none' }}>
                        <CardMedia
                            component="img"
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="musician dmage"
                        ></CardMedia>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4">
                        {item.name}
                    </Typography>
                    <Typography variant="h6">
                        {item.newTitle}
                    </Typography>
                    <Typography variant="body1">
                        {item.bio}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MusicianItem;