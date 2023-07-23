import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
import VideoItem from "./VideoItem";
import { Box, Button } from "@mui/material";
import DeleteDialog from "../Common/DeleteDialog";
import { useState } from "react";

const VideoItemRoute = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const video = useLoaderData();
    const submit = useSubmit();

    const handleDelete = () => {
        submit(null, { method: "POST", action: "delete" });
    };

    return (
        <>
            <DeleteDialog open={modalOpen} setOpen={setModalOpen} name={video.youtubeId} handleDelete={handleDelete} />
            <VideoItem item={video} />
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
                    <Button variant="contained" disabled>
                        Edit
                    </Button>
                </NavLink>
            </Box>
        </>
    );
};

export default VideoItemRoute;