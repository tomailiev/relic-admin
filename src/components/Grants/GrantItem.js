import { Button, Container, Paper, Typography } from "@mui/material";
import months from "../../vars/months";
import { OpenInNew } from "@mui/icons-material";



const GrantItem = ({ item }) => {

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h4" mb={2}>
                {item.name}
            </Typography>
            <Typography variant="body1" mb={2}>
                Notification {item.notification ? 'ON' : 'OFF'}
            </Typography>
            <Button href={item.link} variant="outlined" startIcon={<OpenInNew />} target="_blank" referrerPolicy="no-referrer" >
                Link
            </Button>
            <Container disableGutters>
                <Typography variant="h6" mt={2}>
                    Due:
                </Typography>
                <Typography variant="body1">
                    {item.dueMonths && item.dueMonths.sort((a, b) => a - b).map(m => months[m]).join(', ')}
                </Typography>
            </Container>
        </Paper>
    );
};

export default GrantItem;