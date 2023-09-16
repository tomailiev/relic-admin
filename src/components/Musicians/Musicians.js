import { Typography, Container, Button } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { musicianColumns } from "../../vars/columns";



const Musicians = () => {


    const musicians = useLoaderData();



    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Musicians
                </Typography>
                <NavLink to={'/musicians/add'}>
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                {/* <List sx={{ width: '100%' }}>
                    {musicians?.length
                        ? musicians.map((m) => <ItemList key={m.id} title={m.name} avatar={URL.createObjectURL(m.imgSrc)} data={m} type={'musicians'} />)
                        : Array(10).fill(null).map((m, i) => <ItemList key={i} />)}
                </List> */}
                <DataGrid
                    rows={musicians}
                    columns={musicianColumns}
                />
            </Container>
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Musicians;