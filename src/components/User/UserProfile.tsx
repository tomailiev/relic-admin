import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import AddAvatarDialog from "./AddAvatarDialog";
import { Edit } from "@mui/icons-material";

const UserProfile = () => {
  const { profile } = useContext(UserContext);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);

  const displayName = profile?.displayName ?? "Unnamed User";
  const photoURL = profile?.avatar ?? "";

  return (
    <>
      <AddAvatarDialog open={fileUploadOpen} setOpen={setFileUploadOpen} />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        {/* Avatar Wrapper */}
        <Box
          sx={{
            position: "relative",
            width: 96,
            height: 96,
            cursor: "pointer",
            transition: "all 0.25s ease",
            "&:hover": {
              // border: '2px solid black',
              borderRadius: '2px',
              background: 'rgba(161, 161, 161, 0.7)'
            },
            "&:hover .avatar-overlay": {
              opacity: 1,
            },
          }}
          onClick={() => setFileUploadOpen(true)}
        >
          <Avatar
            src={photoURL}
            alt={displayName}
            sx={{ width: "100%", height: "100%", fontSize: 32 }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>

          {/* Hover Overlay (lower half only) */}
          <Box
            className="avatar-overlay"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "34%",
              background:
                "rgba(161, 161, 161, 0.7)",
              // borderRadius: "0 0 75px 75px",
              opacity: 0,
              transition: "opacity 0.25s ease",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              pb: 0.5,
              color: "white",
              fontSize: 13,
              pointerEvents: "none",
              // overflow: 'hidden'
            }}
          >
            <Edit />
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ mt: 1, pl: '30px' }}
        >
          <Typography variant="h6" fontWeight={600}>
            {displayName}
          </Typography>

          <IconButton
            size="small"
            sx={{
              opacity: 0.4,
              transition: "opacity 0.2s ease, transform 0.2s ease",
              "&:hover": {
                opacity: 1,
                transform: "scale(1.15)",
              },
            }}
            onClick={() => {
              /* you'll handle this later */
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
