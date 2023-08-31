import { Typography, Container, Button } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";


const Texts = () => {



    const texts = useLoaderData();

    const columns = [
        { field: 'icon', headerName: 'Avatar', sortable: false, flex: 0, renderCell: () => <TextSnippetIcon /> },
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'value', headerName: 'Value', flex: 4 },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <Link to={`/texts/${params.id}`}>
                    <Button variant="contained">
                        View
                    </Button>
                </Link>
            )
        }
    ];

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
                    columns={columns}
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