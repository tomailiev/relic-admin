import { Typography, Container, Button, Box } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import CustomGridToolbar from "../Common/GridExportToolbar";
import { ItemTypeMap } from "../../types/DB";
import { ItemProps } from "../../types/fnProps";


const Items = <T extends keyof ItemTypeMap>({ itemType, columns, sorting, pageSize, pageSizeOptions, actionBox }: { itemType: T } & ItemProps) => {

    const items = useLoaderData() as ItemTypeMap[T][] | null;

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

                        {items ? <DataGrid
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
                            : <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="h5" my={4}>No data available</Typography>
                            </Box>
                        }
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Items;