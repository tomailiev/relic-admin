import { Box, Grid, Paper, Typography } from "@mui/material";
// import { Log } from "../../types/DB";
import { LogItemProps } from "../../types/itemProps";



const LogItem = ({ item }: LogItemProps) => {

    return (
        <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
            <Paper
                key={item.id}
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="body1" fontWeight={600}>
                        {item.newTasks && item.newTasks.length ? item.newTasks.map(({ name }) => name).join(' | ') : item.description || item.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.date}
                    </Typography>
                </Box>

                <Typography variant="body1" fontWeight={600}>
                    {item.hours} hrs
                </Typography>
            </Paper>
        </Box>
    );
};

export default LogItem;