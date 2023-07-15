import { Typography, List, Container, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
// import MusicianItem from "./EventItem";
import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddDynamicForm from "../Forms/AddDynamicForm";

const eventFields = {
    dateDone: '',
    description: '',
    imageUrl: '',
    title: '',
    // performances: []
};

const eventFieldsArray = [
    { label: '', id: 'dateDone', type: 'date' },
    { label: 'Description', id: 'description' },
    { label: 'Image Url', id: 'imageUrl' },
    { label: 'Title', id: 'title' },
    // { label: 'Performances', id: 'performances', type: 'array' }
];

const performanceFields = {
    date: '',
    day: '',
    time: '',
    id: '',
    location: '',
    url: '',
    venue: '',
    lat: '',
    lng: '',
};

const performanceFieldArray = [
    { label: '', id: 'date', type: 'date' },
    { label: 'Day of week', id: 'day' },
    { label: '', id: 'time', type: 'time' },
    { label: 'Order id', id: 'id', },
    { label: 'Location (Portland, OR)', id: 'location' },
    { label: 'Url', id: 'url' },
    { label: 'Venue', id: 'venue' },
    { label: 'Latitude', id: 'lat', },
    { label: 'Longitude', id: 'lng', },
];



const Events = () => {

    const events = useLoaderData();
    const [formOpen, setFormOpen] = useState(false);


    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Events
                </Typography>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setFormOpen(prev => !prev)}>
                    Add
                </Button>
                {formOpen && <AddDynamicForm fields={eventFields} fieldsArray={eventFieldsArray} nestedArray={performanceFieldArray} nestedFields={performanceFields} nestedName={'performances'} />}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {events?.length
                        ? events.map((m) => <ItemList key={m.id} title={m.title} avatar={m.imgSrc} data={m} type={'events'} />)
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