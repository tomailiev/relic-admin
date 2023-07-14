import { Grid, Paper, Typography, Card, Box } from "@mui/material";
import YouTube from 'react-youtube';
import youtubeIcon from '../../assets/yt_icon_rgb.png'
import { useLoaderData } from "react-router-dom";

const VideoItem = () => {

    const video = useLoaderData();


    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={video.youtubeId} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12}>
                    <Card sx={{ textDecoration: 'none', position: 'relative' }}>
                        <YouTube
                            videoId={video.youtubeId}
                            opts={{ height: '300px', width: '100%', }}
                        />
                        {/* <CardMedia
                            component="img"
                            // width="70%"
                            // height={300}
                            image={video.thumbnail}
                            alt="video image"
                            sx={{ position: 'relative', zIndex: '1' }}
                        /> */}
                        <Box width={'16%'} position={'absolute'} left={'50%'} top={'50%'} zIndex={100} sx={{ transform: 'translate(-50%,-50%)' }}>
                            <img src={youtubeIcon} width={'100%'} alt="youtube thumb" />
                        </Box>
                </Card>
            </Grid>
            <Grid item md={6}>
                <Typography variant="h6">
                    Title: {video.title}
                </Typography>
                <Typography variant="body1">
                    Priority: {video.featured}
                </Typography>
            </Grid>
        </Grid>
        </Paper >
    );
};

export default VideoItem;