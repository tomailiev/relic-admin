import { useEffect, useState } from "react";
import AppDrawer from "../Common/AppDrawer";
import DrawerContent from "../Common/DrawerContent";
import Header from "../Common/Header";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Box, Breadcrumbs, Link, useMediaQuery, useTheme } from "@mui/material";

const Home = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    // const location = useLocation();
    // const [locationList, setLocationList] = useState([]);

    // useEffect(() => {
    //     console.log(location.pathname);
    //     setLocationList(location.pathname === '/'
    //         ? ['']
    //         : location.pathname.split('/'));
    // }, [location.pathname])


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Header handler={handleDrawerToggle} />
            <AppDrawer children={<DrawerContent />} handler={handleDrawerToggle} mobileOpen={mobileOpen} />
            <Box ml={sm ? '0px' : '240px'}>
                {/* <Breadcrumbs>
                    {locationList.map((name, i, arr) => {
                        return <NavLink to={arr.join()}>
                            {name || 'home'}
                        </NavLink>
                    })}
                </Breadcrumbs> */}
                <Outlet />
            </Box>
        </>
    );
};

export default Home;