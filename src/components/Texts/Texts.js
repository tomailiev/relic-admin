import { Typography, List, Container } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Texts = () => {

    const texts = useLoaderData();

    return (
        <>
            <Typography variant="h3" m={5}>
                Texts
            </Typography>
            <Container maxWidth="lg">
                <List sx={{ width: '100%' }}>
                    {texts?.length
                        ? texts.map((m) => <ItemList key={m.title} title={m.title} icon={<TextSnippetIcon />} data={m} type={'text'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List>
            </Container>
        </>
    );
};

export default Texts;