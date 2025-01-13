import { Link, NavLink, useLoaderData, useSubmit, } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import DeleteDialog from "../Common/DeleteDialog";
import ItemSwitch from "./ItemSwitch";

const ItemRoute = ({ name, itemType }) => {


    const [modalOpen, setModalOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    const item = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        item
            ? <>
                <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={item[name]} handleDelete={handleDelete} />
                <ItemSwitch itemType={itemType} item={item} setEditable={setIsEditable} />
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
                    {isEditable && <NavLink to={'edit'}>
                        <Button variant="contained">
                            Edit
                        </Button>
                    </NavLink>}
                </Box>
            </>
            : <Box sx={{ p: 2, textAlign: 'center' }}>
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

export default ItemRoute;