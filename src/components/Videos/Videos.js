import { Typography, Container, List, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { useContext } from "react";
import UserContext from "../../context/UserContext";


const Videos = () => {

    const { currentUser } = useContext(UserContext);

    const videos = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Videos
                </Typography>
                {currentUser?.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3' && <NavLink to={'/videos/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>}
            </Container>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {videos?.length
                        ? videos.map((v) => <ItemList key={v.id} title={v.title} avatar={v.thumbnail} data={v} type={'videos'} />)
                        : Array(10).fill(null).map((v, i) => <ItemList key={i} />)}
                </List>
            </Container>
        </>
    );
};

export default Videos;