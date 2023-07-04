import { Grid, Paper, Typography, Card, CardMedia, CardActionArea, Box } from "@mui/material";
import YouTube from 'react-youtube';
import { useState } from "react";
import youtubeIcon from '../../assets/yt_icon_rgb.png'

const VideoItem = ({ video }) => {

    const [videoPlayer, setVideoPlayer] = useState(false);

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Grid key={video.id} container spacing={2} justifyContent="center" sx={{
                position: 'relative',
                // left: `${(position < 0 && position !== -(length - 1)) || isShifting ? 150 : position === 1 || position === -(length - 1) ? -150 : 0}%`,
                // top: 0,
                // width: position ? '0px' : 'calc(100% + 16px)',
                // transition: Math.abs(position) === 1 || Math.abs(position) === length - 1? 'width 7s ease-in, visibility 5s ease-in, left 1s ease-in' : !position ? 'left 1s ease-in, width 100ms ease-in' : 'none',
                // visibility: position ? 'hidden' : 'visible',
            }}>
                <Grid item md={6} sm={8} xs={12}>
                    <Card sx={{ textDecoration: 'none', position: 'relative' }}>
                        {videoPlayer
                            ? <YouTube
                                videoId={video.youtubeId}
                                opts={{ height: '300px', width: '100%', }}
                            />
                            : <CardActionArea onClick={() => setVideoPlayer(true)}>
                                <CardMedia
                                    component="img"
                                    // width="70%"
                                    // height={300}
                                    image={video.thumbnail}
                                    alt="video image"
                                    sx={{ position: 'relative', zIndex: '1' }}
                                />
                                <Box width={'16%'} position={'absolute'} left={'50%'} top={'50%'} zIndex={100} sx={{ transform: 'translate(-50%,-50%)' }}>
                                    <img src={youtubeIcon} width={'100%'}/>
                                </Box>
                            </CardActionArea>}
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
        </Paper>
    );
};

export default VideoItem;