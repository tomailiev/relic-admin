import { Typography, List, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import UserContext from "../../context/UserContext";


const Texts = () => {

    const { currentUser } = useContext(UserContext);


    const texts = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Texts
                </Typography>
                {currentUser?.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3' && <NavLink to={'/texts/add'}>
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>}
            </Container>

            <Container maxWidth="lg">

                <List sx={{ width: '100%' }}>
                    {texts?.length
                        ? texts.map((m) => <ItemList key={m.title} title={m.title} icon={<TextSnippetIcon />} data={m} type={'texts'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List>
            </Container>
        </>
    );
};

export default Texts;