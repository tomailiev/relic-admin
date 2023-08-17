import { Typography, Container, Button, Avatar } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import MusicianItem from "./MusicianItem";
// import ItemList from "../Common/ItemList";
// import ItemListSkeleton from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";



const Musicians = () => {


    const musicians = useLoaderData();

    const columns = [
        {
            field: 'icon',
            headerName: 'Avatar',
            sortable: false, flex: 0,
            renderCell: (params) => {
                return <Avatar src={URL.createObjectURL(params.row?.imgSrc)} alt={params.name} />
            }
        },
        // { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'newTitle', headerName: 'Instrument', flex: 4 },
        { field: 'featured', headerName: 'Season', flex: 1 },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <Link to={`/musicians/${params.id}`}>
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
                    columns={columns}
                />
            </Container>
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Musicians;