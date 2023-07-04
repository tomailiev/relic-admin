import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox'
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const ExpandableLI = ({ menuTitle, subMenu }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={menuTitle} />
                {menuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subMenu.map(({ title, path }) => (
                        <Link key={title} to={path} >
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default ExpandableLI;