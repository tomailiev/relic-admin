import { NavLink, useLoaderData, useSubmit, } from "react-router-dom";
import DonorItem from "./DonorItem";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import DeleteDialog from "../Common/DeleteDialog";

const DonorItemRoute = () => {


    const [modalOpen, setModalOpen] = useState(false);
    const donor = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        <>
            <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={`${donor.firstName} ${donor.lastName}`} handleDelete={handleDelete} />
            <DonorItem item={donor} />
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

export default DonorItemRoute;