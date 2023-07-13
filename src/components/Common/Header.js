import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from "react";
import { Logout } from "@mui/icons-material";
import UserContext from "../../context/UserContext";
import { Form, NavLink } from "react-router-dom";

const Header = ({ handler }) => {

    const { currentUser } = useContext(UserContext);

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
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handler}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <IconButton sx={{ position: 'absolute', right: '0', height: '64px', width: '64px', p: 0 }} onClick={handleClick}>
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
                        {currentUser.email}
                    </MenuItem>}
                    {currentUser && <MenuItem>
                        <Form method="POST" action="logout">
                            <Button type="submit" endIcon={<Logout />}>
                                Logout
                            </Button>
                        </Form>
                    </MenuItem>}
                    {!currentUser && (
                        <NavLink to={'login'}>
                            <MenuItem>
                                Login
                            </MenuItem>
                        </NavLink>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;