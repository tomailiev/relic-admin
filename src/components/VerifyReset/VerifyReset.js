import { Container, Typography } from "@mui/material";
import VerifyResetForm from "../Forms/VerifyResetForm";
import { useLocation } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const VerifyReset = () => {
    const location = useLocation();

    return (
        <>
            <Container maxWidth={'sm'}>
                <Typography variant="h3" px={4} py={2} textAlign={'center'}>
                    Enter your email
                </Typography>
                <VerifyResetForm reason={location.pathname.substring(1)} />
                {/* <Typography variant="body2" px={4} py={1} textAlign={'center'}>
                    Need an account? <NavLink to={'/register'}>Register</NavLink> instead.
                </Typography> */}
            </Container>
        </>
    );
};

export default VerifyReset;