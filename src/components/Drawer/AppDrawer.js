import { Drawer } from "@mui/material";
import { useContext } from "react";
import MenuContext from "../../context/MenuContext";

const AppDrawer = ({ children, }) => {

    const { mobileOpen, setMobileOpen } = useContext(MenuContext);

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(!mobileOpen)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {children}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
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