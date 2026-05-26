import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const UserProfile = () => {
  const { profile } = useContext(UserContext);

  const displayName = profile?.displayName ?? "Unnamed User";
  const photoURL = profile?.avatar ?? "";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Avatar
        src={photoURL}
        alt={displayName}
        sx={{ width: 96, height: 96, mb: 2, fontSize: 32 }}
      >
        {displayName.charAt(0).toUpperCase()}
      </Avatar>

      <Typography variant="h6" fontWeight={600}>
        {displayName}
      </Typography>
    </Box>
  );
};

export default UserProfile;
