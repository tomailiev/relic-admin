import { Avatar, Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import AddAvatarDialog from "./AddAvatarDialog";
import { Edit } from "@mui/icons-material";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import ErrorContext from "../../context/ErrorContext";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { UserData } from "../../types/DB";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const { setError } = useContext(ErrorContext);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [profileUpdateOpen, setProfileUpdateOpen] = useState(false);

  const submit = useSubmit();
  const actionData = useActionData() as { code: string, message: string };
  const userData = useLoaderData() as UserData;

  const displayName = userData.displayName ?? "Unnamed User";
  const photoURL = userData.avatar ?? "";

  function handleResetPassword() {
    submit({ reason: 'reset', email: currentUser?.email || '' }, { encType: 'application/json', method: 'post' });
  }

  function handleSubmission(data: Partial<UserData>) {
    submit({ ...data, id: userData.id || currentUser?.uid || '' }, { encType: 'application/json', method: 'post' })
    setFileUploadOpen(false);
    setProfileUpdateOpen(false);
  }

  useEffect(() => {
    if (!actionData) return;

    if (actionData.code === 'Success') {
      setError({ severity: 'success', message: actionData.message, error: true })
    } else {
      setError({ severity: 'error', message: 'Something went wrong', error: true })
    }

  }, [actionData, setError,]);



  return (
    <>
      <AddAvatarDialog open={fileUploadOpen} setOpen={setFileUploadOpen} userData={userData} handleSubmission={handleSubmission} />
      <UpdateProfileDialog open={profileUpdateOpen} setOpen={setProfileUpdateOpen} userData={userData} handleSubmission={handleSubmission} />
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
            borderRadius: '50%',
            overflow: 'hidden',
            "&:hover": {
              // border: '2px solid black',
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
          sx={{ mt: 1 }}
        >
          <Typography variant="h6" fontWeight={600}>
            {displayName}
          </Typography>
        </Box>
        {/* Personal Information Section */}
        <Box
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ mb: 1 }}
          >
            Personal information
          </Typography>

          <Box
            sx={{
              width: "100%",
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>

              <Typography variant="body1">
                {userData.displayName}
              </Typography>

            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>

              <Typography variant="body1">
                {userData.email}
              </Typography>

            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                Role
              </Typography>
              <Typography variant="body1">
                {userData.role}
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "opacity 0.2s ease",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={() => {
                  setProfileUpdateOpen(true);
                }}
              >
                Edit profile
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "opacity 0.2s ease",
                  "&:hover": { opacity: 0.7 },
                }}
                onClick={handleResetPassword}
              >
                Reset password
              </Typography>
            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default UserProfile;
