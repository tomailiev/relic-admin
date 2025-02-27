import { Paper, Typography, Box } from "@mui/material";



const TextItem = ({ item }) => {


    return (
        <Paper sx={{ mx: 4, my: 2, p: 5, }}>
            <Typography variant="h5">{item.key}</Typography>
            {typeof item.value === 'string'
                ? <Typography> {item.value} </Typography>
                : item.value.map(({ infoTitle, infoText }) => {
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