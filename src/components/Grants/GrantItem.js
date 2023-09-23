import { Container, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";



const GrantItem = ({ item }) => {

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h4" mb={2}>
                {item.name}
            </Typography>
            <Typography variant="body1">
                {item.link}
            </Typography>
            <Container disableGutters>
                <Typography variant="h6" mt={2}>
                    Due:
                </Typography>
                <List>
                    {item.dueMonths && item.dueMonths.sort((a, b) => a - b).map((month) => {
                        return (
                                <ListItem key={month}>
                                    <ListItemText primary={month} />
                                </ListItem>
                        )
                    })}
                </List>
            </Container>
        </Paper>
    );
};

export default GrantItem;