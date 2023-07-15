import { Paper, Typography, Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";



const TextItem = () => {

    const text = useLoaderData();

    return (
        <Paper sx={{ mx: 4, my: 2, p: 5, }}>
            <Typography variant="h5">{text.id}</Typography>
            {typeof text.value === 'string'
                ? <Typography> {text.value} </Typography>
                : text.value.map(({ infoTitle, infoText }) => {
                    return (
                        <Box pt={2}>
                                <Typography variant="h6">
                                    {infoTitle}
                                </Typography>
                                <Typography variant="body1">
                                    {infoText}
                                </Typography>
                        </Box>
                
                    )
                })

            }

        </Paper>
    );
};

export default TextItem;