import { Typography, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { textColumns } from "../../vars/columns";


const Texts = () => {



    const texts = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Texts
                </Typography>
                <NavLink to={'/texts/add'}>
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>

            <Container maxWidth="lg" sx={{ my: 3 }}>
                <DataGrid
                    columns={textColumns}
                    rows={texts}
                />
                {/* <List sx={{ width: '100%' }}>
                    {texts?.length
                        ? texts.map((m) => <ItemList key={m.title} title={m.title} icon={<TextSnippetIcon />} data={m} type={'texts'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List> */}
            </Container>
        </>
    );
};

export default Texts;