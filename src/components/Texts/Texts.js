import { Typography, Container, Button, Box } from "@mui/material";
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
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            columns={textColumns}
                            rows={texts}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'id', sort: 'asc' }],
                                },
                                pagination: { paginationModel: { pageSize: 25 } }
                            }}
                            pageSizeOptions={[10, 25, 50]}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Texts;