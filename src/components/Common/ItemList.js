import { ListItem, ListItemAvatar, Skeleton, Typography, Avatar, ListItemIcon, Divider, Button } from "@mui/material"
import { NavLink } from "react-router-dom";


const ItemList = ({ title, avatar, icon, data, type }) => {
    return (
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