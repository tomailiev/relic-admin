import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ handler }) => {

    return (
        <AppBar
            position="sticky"
            sx={{
                width: { sm: `calc(100% - ${240}px)` },
                ml: { sm: `${240}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handler}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;