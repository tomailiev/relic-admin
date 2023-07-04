import { Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MusicianItem from "./MusicianItem";

const Musicians = () => {

    const musicians = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Musicians
            </Typography>
            {musicians?.length && musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)}
        </>
    );
};

export default Musicians;