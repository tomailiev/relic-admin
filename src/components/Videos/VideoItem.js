import { Grid, Paper, Typography, } from "@mui/material";
import YouTube from 'react-youtube';
// import youtubeIcon from '../../assets/yt_icon_rgb.png'

const VideoItem = ({ item }) => {

    return (
        <Paper sx={{  mx: 1, my: 2, py: 5, px: 3  }}>
            <Grid key={item.youtubeId} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={10} xs={12}>
                    <YouTube
                        videoId={item.youtubeId}
                        opts={{ height: '300px', width: '100%', }}
                    />
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6">
                        {item.title}
                    </Typography>
                    <Typography variant="body1">
                        Priority: {item.featured}
                    </Typography>
                </Grid>
            </Grid>
        </Paper >
    );
};

export default VideoItem;