import { Box, Paper, Typography } from "@mui/material"
import { Log } from "../../types/DB"

const IndexLog = ({ log }: { log: Log }) => {
    return <Paper
        elevation={1}
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
                {log.tasks && log.tasks.length ? log.tasks.map(({ name }) => name).join(' | ') : log.description || log.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {log.date}
            </Typography>
        </Box>

        <Typography variant="body1" fontWeight={600}>
            {log.hours} hrs
        </Typography>
    </Paper>
}

export default IndexLog