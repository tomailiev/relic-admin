import {  Container, Typography } from "@mui/material";



const Index = () => {

    return (
        <>
            <Container maxWidth="lg">
                <Typography variant="h3" my={5}>
                    Welcome
                </Typography>
                <Container maxWidth="sm">
                    this is the home page
                </Container>
            </Container>
        </>
    );
};

export default Index;