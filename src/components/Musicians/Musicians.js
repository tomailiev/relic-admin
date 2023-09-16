import { Typography, Container, Button, Box } from "@mui/material";
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
                <Box overflow={'scroll'}>
                    <Box minWidth={'700px'} width={'100%'}>
                        <DataGrid
                            rows={musicians}
                            columns={musicianColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'newTitle', sort: 'asc' }],
                                },
                                pagination: { paginationModel: { pageSize: 15 } }
                            }}
                            pageSizeOptions={[5, 15, 30]}
                        />
                    </Box>
                </Box>
            </Container >
            {/* {musicians?.length 
            ? musicians.map(musician => <MusicianItem key={musician.id} musician={musician} />)
            : <ItemListSkeleton /> */}

        </>
    );
};

export default Musicians;