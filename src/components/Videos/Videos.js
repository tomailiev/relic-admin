import { Typography, Container, List, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";

const fields = {
    featured: '',
    title: '',
    youtubeId: '',
    thumbnail: '',
};

const fieldsArray = [
    { label: 'Featured priority', id: 'featured', type: 'number' },
    { label: 'Title', id: 'title' },
    { label: 'YouTube Id', id: 'youtubeId' },
    { label: 'Thumbail Url', id: 'thumbnail' },
];


const Videos = () => {

    const videos = useLoaderData();

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
                {formOpen && <AddSimpleForm fields={fields} fieldsArray={fieldsArray} />}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {videos?.length
                        ? videos.map((v) => <ItemList key={v.id} title={v.title} avatar={v.thumbnail} data={v} type={'video'} />)
                        : Array(10).fill(null).map((v, i) => <ItemList key={i} />)}
                </List>
            </Container>
        </>
    );
};

export default Videos;