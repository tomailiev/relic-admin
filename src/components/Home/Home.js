import { useEffect, useState } from "react";
import AppDrawer from "../Common/AppDrawer";
import DrawerContent from "../Common/DrawerContent";
import Header from "../Common/Header";
import { NavLink, Outlet, useLocation, useNavigation, } from "react-router-dom";
import { Backdrop, Box, Breadcrumbs, CircularProgress, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuContext from "../../context/MenuContext";

const Home = () => {

    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigation = useNavigation();
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        setLocationList(location.pathname === '/'
            ? ['']
            : location.pathname.split('/'));
    }, [location.pathname])


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={navigation.state === 'submitting'}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Header handler={handleDrawerToggle} />
            <MenuContext.Provider value={{ mobileOpen, setMobileOpen }}>
                <AppDrawer children={<DrawerContent />} />
            </MenuContext.Provider>
            <Box ml={sm ? '0px' : '240px'}>
                <Container sx={{ py: 2 }}>
                    <Breadcrumbs>
                        {locationList.map((name, i, arr) => {
                            return (
                                i === arr.length - 1
                                    ? <Typography key={i} variant="body1">{name || 'home'}</Typography>
                                    : <NavLink key={i} to={arr.slice(0, i + 1).join('/')}>
                                        {name || 'home'}
                                    </NavLink>)
                        })}
                    </Breadcrumbs>
                </Container>
                <Outlet />
            </Box>
        </>
    );
};

export default Home;