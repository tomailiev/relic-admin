import { Typography, List, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./MusicianItem";
import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import UserContext from "../../context/UserContext";



const Musicians = () => {

    const { currentUser } = useContext(UserContext);

    const musicians = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Musicians
                </Typography>
                {currentUser?.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3' && <NavLink to={'/musicians/add'}>
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {musicians?.length
                        ? musicians.map((m) => <ItemList key={m.id} title={m.name} avatar={URL.createObjectURL(m.imgSrc)} data={m} type={'musicians'} />)
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