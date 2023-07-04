import { Card, CardActionArea, CardMedia, Grid, Paper, Typography } from "@mui/material";
import YouTube from 'react-youtube';


const TextItem = ({ text }) => {
    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>
            <Typography>
                {typeof text.value === 'string' ? text.value : 'under construction'}
            </Typography>
        </Paper>
    );
};

export default TextItem;