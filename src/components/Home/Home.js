import { useState } from "react";
import AppDrawer from "../Common/AppDrawer";
import DrawerContent from "../Common/DrawerContent";
import Header from "../Common/Header";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const Home = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Header handler={handleDrawerToggle} />
            <AppDrawer children={<DrawerContent />} handler={handleDrawerToggle} mobileOpen={mobileOpen} />
            <Box ml={xs ? '0px' : '240px'}>
                {/* {xs} */}
                <Outlet />
            </Box>
        </>
    );
};

export default Home;