import { Paper, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const TextItem = ({ text }) => {
    return (
        <Paper sx={{ mx: 4, my: 2, p: 5 }}>

            {typeof text.value === 'string'
                ? <Typography> {text.value} </Typography>
                : text.value.map(({ cardImage, cardTitle, infoTitle, infoText, route }) => {
                    return (
                        <Accordion key={cardTitle}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">
                                    Title: {cardTitle}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1">
                                    Image: {cardImage}
                                </Typography>
                                <Typography variant="body1">
                                    Info Title: {infoTitle}
                                </Typography>
                                <Typography variant="body1">
                                    Info Text: {infoText}
                                </Typography>
                                <Typography variant="body1">
                                    Route: {route}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })

            }

        </Paper>
    );
};

export default TextItem;