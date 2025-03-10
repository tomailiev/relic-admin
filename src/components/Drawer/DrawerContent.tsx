import { Divider, IconButton, List, Toolbar } from "@mui/material";
import ExpandableLI from "./ExpandableLI";
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MenuContext from "../../context/MenuContext";
import { Savings, Storage, Diversity1, Diversity3, AccountBalanceWallet, AccountBalanceWalletOutlined, Mail, RecentActors, RecentActorsOutlined, SendOutlined, Send, AutoAwesomeMotionOutlined, AutoAwesomeMotion, FolderOpen, Folder, } from '@mui/icons-material';
import { MenuType } from "../../types/menu";
// import StorageIcon from '@mui/icons-material/Storage';


const DrawerContent = () => {

    const { setMobileOpen } = useContext(MenuContext);


    const databaseMenu: MenuType[] = [
        { title: 'Videos', path: 'videos', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Musicians', path: 'musicians', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'TextContent', path: 'texts', iconActive: <FolderOpen />, iconInactive: <Folder /> },
        { title: 'Events', path: 'events', iconActive: <FolderOpen />, iconInactive: <Folder /> }
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
    return (
        <>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <NavLink to={'/'}>
                    <IconButton onClick={() => setMobileOpen(false)}>
                        <HomeIcon fontSize="large" />
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
            <Divider />
        </>
    );
};

export default DrawerContent;