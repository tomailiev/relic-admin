import { NavLink, useLoaderData, useSubmit, } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import DeleteDialog from "../Common/DeleteDialog";
import GrantItem from "./GrantItem";

const GrantItemRoute = () => {


    const [modalOpen, setModalOpen] = useState(false);
    const grant = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        <>
            <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={grant.name} handleDelete={handleDelete} />
            <GrantItem item={grant} />
            <Box sx={{ display: 'flex', flexDirection: 'row', px: 4, py: 1 }}>
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
            </Box>
        </>
    );
};

export default GrantItemRoute;