import { ListItem, ListItemAvatar, Skeleton, Typography, Avatar, ListItemIcon, Divider, Button } from "@mui/material"
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MusicianItem from "../Musicians/MusicianItem";
// import VideoItem from "../Videos/VideoItem";
// import TextItem from "../Texts/TextItem";
// import EventItem from "../Events/EventItem";
import { NavLink } from "react-router-dom";


const ItemList = ({ title, avatar, icon, data, type }) => {
    // const children = {
    //     musician: <MusicianItem musician={data} />,
    //     video: <VideoItem video={data} />,
    //     text: <TextItem text={data} />,
    //     event: <EventItem event={data} />

    // }

    return (
        // <Accordion >
        //         <AccordionSummary
        //             expandIcon={<ExpandMoreIcon />}
        //             aria-controls="panel2a-content"
        //             id="panel2a-header"
        //             sx={{ width: '100%' }}
        //         >
        <>
            <ListItem sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                <ListItemAvatar>
                    {avatar
                        ? <Avatar src={avatar} alt={data.name || data.title} />
                        : icon
                            ? <ListItemIcon>{icon}</ListItemIcon>
                            : <Skeleton variant="circular" width={40} height={40} />
                    }
                </ListItemAvatar>
                <Typography width={'70%'} sx={{ verticalAlign: 'center' }}>
                    {title
                        ? title
                        : <Skeleton variant="text" />
                    }
                </Typography>
                <NavLink to={`/${type}/${data.id}`}>
                    <Button variant="contained">
                        View
                    </Button>
                </NavLink>
            </ListItem >
            <Divider />
        </>

    );
};

export default ItemList;