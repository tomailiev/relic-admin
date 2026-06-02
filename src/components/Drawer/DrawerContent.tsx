import { Box, Divider, IconButton, List, Toolbar } from "@mui/material";
import ExpandableLI from "./ExpandableLI";
// import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MenuContext from "../../context/MenuContext";
import { Savings, Storage, Diversity1, Diversity3, AccountBalanceWallet, AccountBalanceWalletOutlined, Mail, RecentActors, RecentActorsOutlined, SendOutlined, Send, AutoAwesomeMotionOutlined, AutoAwesomeMotion, FolderOpen, Folder, Filter, Image, AccessTime, AccessTimeFilled, Work, TaskOutlined, Task, } from '@mui/icons-material';
import { MenuType } from "../../types/menu";
import homeIcon from "../../assets/admin_icon_512.png"
// import StorageIcon from '@mui/icons-material/Storage';


const DrawerContent = () => {

    const { setMobileOpen } = useContext(MenuContext);


    const databaseMenu: MenuType[] = [
        { title: 'Videos', path: 'videos', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Musicians', path: 'musicians', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Texts', path: 'texts', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Events', path: 'events', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Photos', path: 'photos', iconActive: <Filter />, iconInactive: <Image /> }
    ];

    const developmentMenu: MenuType[] = [
        { title: 'Donors', path: 'donors', iconInactive: <Diversity3 />, iconActive: <Diversity1 /> },
        { title: 'Grants', path: 'grants', iconInactive: <AccountBalanceWallet />, iconActive: <AccountBalanceWalletOutlined /> }
    ];

    const emailMenu: MenuType[] = [
        { title: 'Subscribers', path: 'subscribers', iconActive: <RecentActorsOutlined />, iconInactive: <RecentActors /> },
        { title: 'Campaigns', path: 'campaigns', iconActive: <SendOutlined />, iconInactive: <Send /> },
        { title: 'Lists', path: 'lists', iconActive: <AutoAwesomeMotionOutlined />, iconInactive: <AutoAwesomeMotion /> }
    ]

    const workflowMenu: MenuType[] = [
        { title: 'Logs', path: 'logs', iconActive: <AccessTime />, iconInactive: <AccessTimeFilled /> },
        { title: 'Tasks', path: 'tasks', iconActive: <TaskOutlined />, iconInactive: <Task /> }
    ]
    return (
        <>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <NavLink to={'/'} >
                    <IconButton onClick={() => setMobileOpen(false)}>
                        {/* <HomeIcon fontSize="large" /> */}
                        <Box overflow={'hidden'} height={'60px'} width={'60px'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                            <img src={homeIcon} alt="home icon" aria-label="home" width={'100%'} height={'auto'} />
                        </Box>
                    </IconButton>
                </NavLink>
            </Toolbar>
            <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    ['Database'].map((text, index) => (
                        <ExpandableLI key={text} menuTitle={text} subMenu={databaseMenu} icon={<Storage />} />
                    ))
                }
            </List >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    ['Development'].map((text, index) => (
                        <ExpandableLI key={text} menuTitle={text} subMenu={developmentMenu} icon={<Savings />} />
                    ))
                }
            </List>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    ['Email'].map((text, index) => (
                        <ExpandableLI key={text} menuTitle={text} subMenu={emailMenu} icon={<Mail />} />
                    ))
                }
            </List>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    ['Workflow'].map((text, index) => (
                        <ExpandableLI key={text} menuTitle={text} subMenu={workflowMenu} icon={<Work />} />
                    ))
                }
            </List>
            <Divider />
        </>
    );
};

export default DrawerContent;