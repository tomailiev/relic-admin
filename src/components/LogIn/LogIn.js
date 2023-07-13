import { Container, Typography } from "@mui/material";
import SignInForm from "../Forms/SignInForm";

const LogIn = () => {

    return (
        <>
            <Container maxWidth={'sm'}>
                <Typography variant="h3" px={4} py={2} textAlign={'center'}>
                    Log in
                </Typography>
                <SignInForm />
            </Container>
        </>
    );
};

export default LogIn;