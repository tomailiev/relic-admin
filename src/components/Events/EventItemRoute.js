import { NavLink, useLoaderData, } from "react-router-dom";
import EventItem from "./EventItem";
import { Box, Button } from "@mui/material";

const EventItemRoute = () => {

    const event = useLoaderData();
    // const submit = useSubmit();

    const handleDelete = () => {
        console.log(event.id);
    };

    return (
        <>
            <EventItem item={event} />
            <Box sx={{ display: 'flex', flexDirection: 'row', px: 4, py: 1 }}>
                <Button
                    color="inherit"
                    // disabled={activeStep === 0}
                    onClick={handleDelete}
                    sx={{ mr: 1 }}
                >
                    Delete
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <NavLink to={'edit'}>
                    <Button variant="contained" disabled>
                        Edit
                    </Button>
                </NavLink>
            </Box>
        </>
    );
};

export default EventItemRoute;