import { Grid, Paper, Typography } from "@mui/material";
import YouTube from 'react-youtube';

const VideoItem = ({ video }) => {
    return (
        <Paper sx={{mx: 4, my: 2, p: 5}}>
            <Grid key={video.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
                // left: `${(position < 0 && position !== -(length - 1)) || isShifting ? 150 : position === 1 || position === -(length - 1) ? -150 : 0}%`,
                // top: 0,
                // width: position ? '0px' : 'calc(100% + 16px)',
                // transition: Math.abs(position) === 1 || Math.abs(position) === length - 1? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : !position ? 'left 1s ease-in, width 100ms ease-in' : 'none',
                // visibility: position ? 'hidden' : 'visible',
            }}>
                <Grid item md={6} sm={8} xs={12}>
                    <YouTube
                        videoId={video.youtubeId}
                        opts={{ height: '300px', width: '100%', }}
                    // onPlay={playVideo}
                    // onStateChange={cueUpVideo}
                    />
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
        </Paper>
    );
};

export default VideoItem;