import { Drawer } from "@mui/material";

const AppDrawer = ({ children, mobileOpen, handler }) => {


    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handler}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {children}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
                open
            >
                {children}
            </Drawer>
        </>
    );
};

export default AppDrawer;