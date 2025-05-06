import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ReactElement, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import MenuContext from "../../context/MenuContext";
import UserContext from "../../context/UserContext";
import { MenuType } from "../../types/menu";

const ExpandableLI = ({ menuTitle, subMenu, icon }: { menuTitle: string, subMenu: MenuType[], icon: ReactElement }) => {

    const { currentUser } = useContext(UserContext);
    const { setMobileOpen } = useContext(MenuContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <ListItemButton onClick={handleClick} disabled={!currentUser}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={menuTitle} />
                {menuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={menuOpen && !!currentUser} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subMenu.map(({ title, path, iconActive, iconInactive }) => (
                        <NavLink key={title} to={path} >
                            {({ isActive, }) => {
                                const icon = isActive ? iconActive : iconInactive;
                                return <ListItemButton sx={{ pl: 4 }} onClick={() => setMobileOpen(false)}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItemButton>
                            }}
                        </NavLink>
                    ))}
                </List>
            </Collapse>
        </>
    );
};

export default ExpandableLI;