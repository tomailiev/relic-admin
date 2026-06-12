import { Grid, Paper, Typography } from "@mui/material";
// import { Log } from "../../types/DB";
import { LogItemProps } from "../../types/itemProps";



const LogItem = ({ item }: LogItemProps) => {

    return (
        <Paper sx={{ mx: 8, my: 2, p: 5, }}>
            <Typography variant="h4" mb={2}>
                {item.date}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Typography variant="body1">
                        Number of hours: {item.hours}
                    </Typography>
                    <Typography variant="body1">
                        Tasks worked on: {item.newTasks?.length && item.newTasks.map(({ name }) => name).join(', ')}
                    </Typography>
                </Grid>
                <Grid item md={6} sm={8} xs={12} p={6}>
                    <Typography variant="body1" mb={2}>
                        Description: {item.description || item.category}
                    </Typography>

                </Grid>
            </Grid>
        </Paper>
    );
};

export default LogItem;