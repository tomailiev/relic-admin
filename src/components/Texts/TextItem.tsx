import { Paper, Typography, Box } from "@mui/material";
import { Text } from "../../types/DB";



const TextItem = ({ item }: { item: Text }) => {


    return (
        <Paper sx={{ mx: 4, my: 2, p: 5, }}>
            <Typography variant="h5">{item.key}</Typography>
            <Typography> {item.value} </Typography>
            {/* : item.value.map(({ infoTitle, infoText }) => {
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
                }) */}

            {/* } */}

        </Paper>
    );
};

export default TextItem;