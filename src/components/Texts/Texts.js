import { Typography, List, Container, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ItemList from "../Common/ItemList";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import AddSimpleForm from "../Forms/AddSimpleForm";

const fields = {
    key: '',
    value: ''
};

const fieldsArray = [
    { label: 'Title', id: 'key' },
    { label: 'Value', id: 'value' }
];

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
                {formOpen && <AddSimpleForm fields={fields} fieldsArray={fieldsArray} />}
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