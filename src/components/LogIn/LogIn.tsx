import { Container, Typography } from "@mui/material";
import SignInForm from "../Forms/SignInForm";
import { NavLink } from "react-router-dom";

const LogIn = () => {

    return (
        <>
            <Container maxWidth={'sm'}>
                <Typography variant="h3" px={4} py={2} textAlign={'center'}>
                    Log in
                </Typography>
                <SignInForm />
                <Typography variant="body2" px={4} py={1} textAlign={'center'}>
                    Need an account? <NavLink to={'/register'}>Register</NavLink> instead.
                </Typography>
            </Container>
        </>
    );
};

export default LogIn;