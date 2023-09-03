import { AppBar, Box, Button, IconButton, LinearProgress, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from "react";
import { Email, Login, Logout, ExitToApp } from "@mui/icons-material";
import UserContext from "../../context/UserContext";
import { Form, NavLink, useNavigation } from "react-router-dom";

const Header = ({ handler }) => {

    const { currentUser } = useContext(UserContext);
    const navigation = useNavigation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {currentUser && <MenuItem>
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText>
                            {currentUser.email}
                        </ListItemText>
                    </MenuItem>}
                    {currentUser && <MenuItem>
                        <Form method="POST" action="logout">
                            <Button type="submit" sx={{ textTransform: 'none', py: 0, }}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                <ListItemText>
                                    Log out
                                </ListItemText>
                            </Button>
                        </Form>
                    </MenuItem>}
                    {!currentUser && (
                        <NavLink to={'login'}>
                            <MenuItem>
                                <ListItemIcon>
                                    <Login />
                                </ListItemIcon>
                                <ListItemText>
                                    Log in
                                </ListItemText>
                            </MenuItem>
                        </NavLink>
                    )}
                    {!currentUser && (
                        <NavLink to={'register'}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ExitToApp />
                                </ListItemIcon>
                                <ListItemText>
                                    Register
                                </ListItemText>
                            </MenuItem>
                        </NavLink>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;