import { Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import RegisterForm from "../Forms/RegisterForm";

const Register = () => {

    return (
        <>
            <Container maxWidth={'sm'}>
                <Typography variant="h3" px={4} py={2} textAlign={'center'}>
                    Log in
                </Typography>
                <RegisterForm />
                <Typography variant="body2" px={4} py={1} textAlign={'center'}>
                    Already have an account? <NavLink to={'/login'}>Log in</NavLink> instead.
                </Typography>
            </Container>
        </>
    );
};

export default Register;