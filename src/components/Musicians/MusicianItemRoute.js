import { useLoaderData } from "react-router-dom";
import MusicianItem from "./MusicianItem";

const MusicianItemRoute = () => {

    const musician = useLoaderData();
    return (
        <MusicianItem item={musician} />
    );
};

export default MusicianItemRoute;