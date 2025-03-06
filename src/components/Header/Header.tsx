import { AppBar, Box, Drawer, IconButton, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from "react";
import { Email, Login, Logout, ExitToApp } from "@mui/icons-material";
import UserContext from "../../context/UserContext";
import { NavLink, useNavigation, useSubmit } from "react-router-dom";

const Header = ({ handler }: { handler: () => void }) => {

    const { currentUser } = useContext(UserContext);
    const navigation = useNavigation();
    const submit = useSubmit();
    const [open, setOpen] = useState(false);

    const logout = () => {
        handleClick();
        submit(null, { method: 'post', action: '/logout' });
    }

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                width: { md: `calc(100% - ${240}px)` },
                ml: { md: `${240}px` },
            }}
        >
            <Toolbar sx={{ position: 'relative' }}>
                {navigation.state === 'loading' && <LinearProgress color="success" sx={{ zIndex: 1000, position: 'absolute', width: '100%', left: '0', top: '0' }} />}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handler}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flex: '1 1 auto' }} />
                <IconButton onClick={handleClick}>
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Drawer
                    anchor={'right'}
                    open={open}
                    onClose={handleClose}
                >
                    <List>
                        {currentUser && <ListItem onClick={handleClick}>
                            <ListItemIcon>
                                <Email />
                            </ListItemIcon>
                            <ListItemText>
                                {currentUser.email}
                            </ListItemText>
                        </ListItem>}
                        {currentUser && <ListItem onClick={logout} sx={{ cursor: 'pointer', textDecoration: 'underline', color: '-webkit-link' }}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText>
                                Log out
                            </ListItemText>
                        </ListItem>}
                        {!currentUser && (
                            <NavLink to={'login'} onClick={handleClick}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Login />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Log in
                                    </ListItemText>
                                </ListItem>
                            </NavLink>
                        )}
                        {!currentUser && (
                            <NavLink to={'register'} onClick={handleClick}>
                                <ListItem>
                                    <ListItemIcon>
                                        <ExitToApp />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Register
                                    </ListItemText>
                                </ListItem>
                            </NavLink>
                        )}
                    </List>
                </Drawer>
                {/* </Menu> */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;