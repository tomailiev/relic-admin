import { Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Photo } from "../../types/DB";

const PhotoItem = ({ item }: { item: Photo }) => {

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={item.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12} p={6} textAlign={'center'}>
                    <Card sx={{ textDecoration: 'none' }}>
                        {item.imgSrc && <CardMedia
                            component="img"
                            image={URL.createObjectURL(item.imgSrc)}
                            alt="photo"
                        ></CardMedia>}
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h4">
                        {item.title}
                    </Typography>
                    <Typography variant="h6">
                        PC: {item.pc}
                    </Typography>
                    <Typography variant="body1">
                        Caption: {item.caption}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PhotoItem;