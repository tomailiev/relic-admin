import { useContext, useEffect, useState } from "react";
import AppDrawer from "../Drawer/AppDrawer";
import { NavLink, Outlet, useLocation, useNavigation, useSubmit, } from "react-router-dom";
import { Backdrop, Box, Breadcrumbs, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from "@mui/material";
import MenuContext from "../../context/MenuContext";
import UserContext from "../../context/UserContext";
import ErrorFeedback from "../Common/ErrorFeedback";
import ErrorContext from "../../context/ErrorContext";
import Header from "../Header/Header";
import DrawerContent from "../Drawer/DrawerContent";
import LoadingContext from "../../context/LoadingContext";


const time = process.env.NODE_ENV === 'development' ? 10000 : 1200;

const Home = () => {

    const { currentUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<true | false>(false);
    const [mobileOpen, setMobileOpen] = useState<true | false>(false);
    const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigation = useNavigation();
    const submit = useSubmit();
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        setLocationList(location.pathname === '/'
            ? ['']
            : location.pathname.split('/'));
    }, [location.pathname])


    useEffect(() => {
        let timer;
        if ((currentUser && navigation.state === 'idle') && !timeoutModalOpen) {
            timer = setTimeout(() => {
                setTimeoutModalOpen(true);
            }, time * 1000)
        } else {
            clearTimeout(timer)
        }

        return () => clearTimeout(timer);

    }, [currentUser, navigation.state, timeoutModalOpen]);

    useEffect(() => {
        let timer;
        if (timeoutModalOpen) {
            timer = setTimeout(() => {
                submit(null, { method: 'post', action: '/logout' });
                setTimeoutModalOpen(false);
            }, 60 * 1000)
        } else {
            clearTimeout(timer);
        }

        return (() => clearTimeout(timer));
    }, [timeoutModalOpen, submit]);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
                    open={navigation.state === 'submitting' || isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Dialog
                    open={timeoutModalOpen}
                    onClose={() => setTimeoutModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        You will be logged out due to inactivity
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Continue session?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setTimeoutModalOpen(false)}>Continue</Button>
                    </DialogActions>
                </Dialog>
                <ErrorFeedback />
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
            </LoadingContext.Provider>
        </ErrorContext.Provider>
    );
};

export default Home;