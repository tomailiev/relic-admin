import { Typography, Container, Button, Avatar } from "@mui/material";
import { Link, NavLink, useLoaderData } from "react-router-dom";
// import ItemList from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";


const Videos = () => {


    const videos = useLoaderData();
    const columns = [
        {
            field: 'icon',
            headerName: 'Avatar',
            sortable: false, flex: 0,
            renderCell: (params) => {
                return <Avatar src={params.row?.thumbnail} alt={params.row?.title} />
            }
        },
        // { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'title', headerName: 'Title', flex: 4 },
        { field: 'featured', headerName: 'Priority', flex: 1 },
        {
            field: 'select',
            headerName: 'Select',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <Link to={`/videos/${params.id}`}>
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
                    Videos
                </Typography>
                <NavLink to={'/videos/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <DataGrid
                    rows={videos}
                    columns={columns}
                />
                {/* <List sx={{ width: '100%' }}>
                    {videos?.length
                        ? videos.map((v) => <ItemList key={v.id} title={v.title} avatar={v.thumbnail} data={v} type={'videos'} />)
                        : Array(10).fill(null).map((v, i) => <ItemList key={i} />)}
                </List> */}
            </Container>
        </>
    );
};

export default Videos;