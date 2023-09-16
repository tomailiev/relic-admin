import { Typography, Container, Button, Box, } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
// import ItemList from "../Common/ItemList";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { videoColumns } from "../../vars/columns";


const Videos = () => {


    const videos = useLoaderData();


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
                <Box overflow={'scroll'}>
                    <Box minWidth={'600px'} width={'100%'}>
                        <DataGrid
                            rows={videos}
                            columns={videoColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'featured', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[5, 10, 20]}
                        />
                        {/* <List sx={{ width: '100%' }}>
                    {videos?.length
                        ? videos.map((v) => <ItemList key={v.id} title={v.title} avatar={v.thumbnail} data={v} type={'videos'} />)
                        : Array(10).fill(null).map((v, i) => <ItemList key={i} />)}
                </List> */}
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Videos;