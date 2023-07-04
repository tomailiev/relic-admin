import { Typography, List, Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MusicianItem from "./MusicianItem";
import ItemList from "../Common/ItemList";
import ItemListSkeleton from "../Common/ItemList";

const Musicians = () => {

    const musicians = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Musicians
            </Typography>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {musicians?.length
                        ? musicians.map((m) => <ItemList key={m.id} title={m.name} avatar={m.imgSrc} data={m} type={'musician'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List>
            </Container>
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Musicians;