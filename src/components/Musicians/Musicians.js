import { Typography, List, Container, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
// import MusicianItem from "./MusicianItem";
import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import AddSimpleForm from "../Forms/AddSimpleForm";


const fields = {
    bio: '',
    featured: '',
    name: '',
    newTitle: '',
    pic: ''
};

const fieldsArray = [
    { label: 'Bio', id: 'bio', },
    { label: 'Name', id: 'name' },
    { label: 'Featured in season', id: 'featured', type: 'number' },
    { label: 'Title/Instrument', id: 'newTitle' },
    { label: 'Avatar location', id: 'pic'}
]

const Musicians = () => {

    const [formOpen, setFormOpen] = useState(false);

    const musicians = useLoaderData();

    return (
        <>
             <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Musicians
                </Typography>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setFormOpen(prev => !prev)}>
                    Add
                </Button>
                {formOpen && <AddSimpleForm fields={fields} fieldsArray={fieldsArray} />}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {musicians?.length
                        ? musicians.map((m) => <ItemList key={m.id} title={m.name} avatar={m.imgSrc} data={m} type={'musicians'} />)
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