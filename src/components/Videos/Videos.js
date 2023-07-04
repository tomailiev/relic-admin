import { Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import VideoItem from "./VideoItem";

const Videos = () => {

    const videos = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Videos
            </Typography>
            {videos?.length && videos.map(video => <VideoItem key={video.id} video={video} />)}
        </>
    );
};

export default Videos;