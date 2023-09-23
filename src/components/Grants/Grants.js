import { Typography, Container, Button, Box } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { grantColumns } from "../../vars/columns";




const Grants = () => {

    const grants = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Grants
                </Typography>
                <NavLink to={'/grants/add'} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={grants}
                            columns={grantColumns}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'name', sort: 'desc' }],
                                },
                                pagination: { paginationModel: { pageSize: 10 } }
                            }}
                            pageSizeOptions={[10, 20, 30]}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Grants;