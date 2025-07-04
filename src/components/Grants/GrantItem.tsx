import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { DeschematifiedGrant } from "../../types/DB";



const GrantItem = ({ item }: {item: DeschematifiedGrant}) => {
    
    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h4" mb={2}>
                {item.name}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Typography variant="body1">
                        {item.description}
                    </Typography>
                </Grid>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Typography variant="body1" mb={2}>
                        Notification: {item.notification}
                    </Typography>
                    <Button href={item.link} variant="outlined" startIcon={<OpenInNew />} target="_blank" referrerPolicy="no-referrer" >
                        Link
                    </Button>
                    <Container disableGutters>
                        <Typography variant="h6" mt={2}>
                            Due:
                        </Typography>
                        <Typography variant="body1">
                            {item.dueMonths && item.dueMonths.map(({dueMonth}) => dueMonth).join(', ')}
                        </Typography>
                    </Container>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default GrantItem;