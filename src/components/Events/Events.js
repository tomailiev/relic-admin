import { Typography, List, Container, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import MusicianItem from "./EventItem";
import ItemList from "../Common/ItemList";
import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddForm from "../Common/AddForm";

const fields = {
    dateDone: '',
    description: '',
    imageUrl: '',
    title: '',
    performances: []
};

const fieldsArray = [

];

const nestedFields = {
    date: '',
    day: '',
    time: '',
    id: '',
    location: '',
    url: '',
    venue: '',
    lat: '',
    lng: '',
}


const Events = () => {

    const events = useLoaderData();
    const [formOpen, setFormOpen] = useState(false);


    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Videos
                </Typography>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setFormOpen(prev => !prev)}>
                    Add
                </Button>
                {formOpen && <AddForm fields={fields} fieldsArray={fieldsArray} />}
            </Container>
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