import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import MusicianItem from "./MusicianItem";
import DeleteDialog from "../Common/DeleteDialog";
import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";

const MusicianItemRoute = () => {

    const { currentUser } = useContext(UserContext);


    const [modalOpen, setModalOpen] = useState(false);
    const musician = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        <>
            <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={musician.name} handleDelete={handleDelete} />
            <MusicianItem item={musician} />
            {currentUser?.uid === 'O7QvZktadtgcOuLZ2KqKGEAaRaF3' && <Box sx={{ display: 'flex', flexDirection: 'row', px: 4, py: 1 }}>
                <Button
                    color="inherit"
                    // disabled={activeStep === 0}
                    onClick={() => setModalOpen(true)}
                    sx={{ mr: 1 }}
                >
                    Delete
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <NavLink to={'edit'}>
                    <Button variant="contained">
                        Edit
                    </Button>
                </NavLink>
            </Box>}
        </>

    );
};

export default MusicianItemRoute;