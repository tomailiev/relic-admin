import { Typography, Container, Button, Box } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import CustomGridToolbar from "../Common/GridExportToolbar";


const Items = ({ itemType, columns, sorting, pageSize, pageSizeOptions, actionBox }) => {

    const items = useLoaderData();

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5} textTransform={'capitalize'}>
                    {itemType}
                </Typography>
                <NavLink to={`/${itemType}/add`} >
                    <Button variant="contained" endIcon={<AddIcon />}>
                        New...
                    </Button>
                </NavLink>
            </Container>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                {actionBox && actionBox}
                <Box overflow={'scroll'}>
                    <Box minWidth={'800px'} width={'100%'}>
                        <DataGrid
                            rows={items}
                            columns={columns}
                            slots={{ toolbar: CustomGridToolbar }}
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