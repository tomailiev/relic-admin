import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import TextItem from "./TextItem";
import { useContext, useState } from "react";
import DeleteDialog from "../Common/DeleteDialog";
import { Box, Button } from "@mui/material";
import UserContext from "../../context/UserContext";

const TextItemRoute = () => {

    const { currentUser } = useContext(UserContext);

    const [modalOpen, setModalOpen] = useState(false);
    const text = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        <>
            <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={text.id} handleDelete={handleDelete} />
            <TextItem item={text} />
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

export default TextItemRoute;