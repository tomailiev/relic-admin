import { Box, Button, Typography } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <Box id="error-page" sx={{ textAlign: 'center' }}>
            {error instanceof Response && <Typography variant="h3" pt={5}>{error.status}: {error.statusText}</Typography>}
            {error instanceof Error && <Typography variant="h3" pt={5}>{error.message}</Typography>}
            {/* <Typography variant="h6" py={4}>{error.data}</Typography> */}
            <Link to={'/'}>
                <Button variant={'outlined'}>Home</Button>
            </Link>
        </Box>
    );
}