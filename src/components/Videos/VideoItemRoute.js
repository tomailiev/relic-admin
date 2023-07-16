import { useLoaderData } from "react-router-dom";
import VideoItem from "./VideoItem";

const VideoItemRoute = () => {

    const video = useLoaderData();

    return (
        <VideoItem video={video} />
    );
};

export default VideoItemRoute;