import { Typography, List, Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MusicianItem from "./EventItem";
import ItemList from "../Common/ItemList";
import ItemListSkeleton from "../Common/ItemList";

const Events = () => {

    const events = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Events
            </Typography>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {events?.length
                        ? events.map((m) => <ItemList key={m.id} title={m.title} avatar={m.imgSrc} data={m} type={'event'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List>
            </Container>
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Events;