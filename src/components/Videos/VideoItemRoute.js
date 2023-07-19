import { useLoaderData } from "react-router-dom";
import VideoItem from "./VideoItem";

const VideoItemRoute = () => {

    const video = useLoaderData();
    console.log(video);
    return (
        <VideoItem item={video} />
    );
};

export default VideoItemRoute;