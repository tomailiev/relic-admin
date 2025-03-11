import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ItemProps } from "../../types/fnProps";

const NoResource = ({itemType}: ItemProps) => {
    
    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" my={4}>No resource with this ID exists</Typography>
                <Link to={`/${itemType}`}>
                    <Button
                        color="inherit"
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                </Link>

            </Box>
    );
};

export default NoResource;