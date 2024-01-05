import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const SubscriberActionBox = () => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pb: 1 }}>
            <NavLink to={'/CSVs/add'} >
                <Button
                    color="inherit"
                    variant="outlined"
                >
                    Import CSV
                </Button>
            </NavLink>
            <Box sx={{ flex: '1 1 auto' }} />
            <NavLink to={'/donors/import'} >
                <Button
                    color="inherit"
                    variant="outlined"
                >
                    Import Donors
                </Button>
            </NavLink>
        </Box>
    );
};

export default SubscriberActionBox;