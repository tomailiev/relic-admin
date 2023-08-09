import { Typography, List, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import UserContext from "../../context/UserContext";




const Events = () => {

    const events = useLoaderData();
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Events
                </Typography>
                {currentUser?.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3' && <NavLink to={'/events/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {events?.length
                        ? events.map((m) => <ItemList key={m.id} title={m.title} avatar={URL.createObjectURL(m.imgSrc)} data={m} type={'events'} />)
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