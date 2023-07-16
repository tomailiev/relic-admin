import { Grid, Paper, Typography, } from "@mui/material";
import YouTube from 'react-youtube';
// import youtubeIcon from '../../assets/yt_icon_rgb.png'

const VideoItem = ({ video }) => {

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={video.youtubeId} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
            }}>
                <Grid item md={6} sm={8} xs={12}>
                    <YouTube
                        videoId={video.youtubeId}
                        opts={{ height: '300px', width: '100%', }}
                    />
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h6">
                        {video.title}
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