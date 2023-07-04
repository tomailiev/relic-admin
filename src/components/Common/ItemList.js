import { ListItem, ListItemAvatar, Skeleton, Typography, Avatar, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MusicianItem from "../Musicians/MusicianItem";
import VideoItem from "../Videos/VideoItem";


const ItemList = ({ title, avatar, data, type }) => {
    const children = {
        musician: <MusicianItem musician={data} />,
        video: <VideoItem video={data} />

    }

    return (
        <Accordion >
            <ListItem sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{ width: '100%' }}
                >
                    <ListItemAvatar>
                        {avatar
                            ? <Avatar src={avatar} alt={data.name || data.title} />
                            : <Skeleton variant="circular" width={40} height={40} />
                        }
                    </ListItemAvatar>
                    <Typography width={'70%'} sx={{verticalAlign: 'center'}}>
                        {title
                            ? title
                            : <Skeleton variant="text" />
                        }
                    </Typography>
                </AccordionSummary>
            </ListItem >
            <AccordionDetails>
                {children[type]}
            </AccordionDetails>
        </Accordion>
    );
};

export default ItemList;