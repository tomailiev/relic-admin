import { NavLink, useLoaderData, useSubmit, } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import DeleteDialog from "../Common/DeleteDialog";
import ItemSwitch from "./ItemSwitch";
import NoResource from "../Common/NoResource";
import { ItemProps } from "../../types/fnProps";
import { ItemTypeMap } from "../../types/DB";

const ItemRoute = <T extends keyof ItemTypeMap>({ name, itemType }: { itemType: T } & ItemProps) => {


    const [modalOpen, setModalOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    const item = useLoaderData() as ItemTypeMap[T];
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
            : <NoResource itemType={itemType} />
    );
};

export default ItemRoute;