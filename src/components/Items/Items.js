import { Typography, Container, Button, Box } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";


const Items = ({ itemType, columns, sorting, pageSize, pageSizeOptions }) => {

    const items = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5} textTransform={'capitalize'}>
                    {itemType}
                </Typography>
                <NavLink to={`/${itemType}/add`} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        Add
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            initialState={{
                                sorting: {
                                    sortModel: [sorting],
                                },
                                pagination: { paginationModel: { pageSize } }
                            }}
                            pageSizeOptions={pageSizeOptions}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Items;