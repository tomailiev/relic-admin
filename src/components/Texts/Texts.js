import { Typography, List, Container, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddForm from "../Common/AddForm";

const Texts = () => {

    const texts = useLoaderData();
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Texts
                </Typography>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setFormOpen(prev => !prev)}>
                    Add
                </Button>
                {formOpen && <AddForm />}
            </Container>

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