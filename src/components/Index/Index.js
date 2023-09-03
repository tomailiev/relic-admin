import { Alert, Container, Typography } from "@mui/material";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { NavLink } from "react-router-dom";

const HomeAlert = () => {
    const { currentUser } = useContext(UserContext);

    return <>
        {!currentUser
            ? <Alert severity="warning">Not logged in. <NavLink to={'/login'}>Log in</NavLink> to access more features</Alert>
            : currentUser.emailVerified
                ? <Alert severity="success">Logged in as {currentUser.email}</Alert>
                : <Alert severity="warning">Logged in but not verified. <NavLink to={'/verify'}>Verify your email</NavLink></Alert>}
    </>
}


const Index = () => {

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Welcome to Relic admin
                </Typography>
                <HomeAlert />
                {/* <Container maxWidth="sm">
                    this is the home page
                </Container> */}
            </Container>
        </>
    );
};

export default Index;