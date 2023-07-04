import { Typography, Container, List } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";

const Videos = () => {

    const videos = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Videos
            </Typography>
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