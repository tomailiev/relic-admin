import { Divider, IconButton, List, Toolbar } from "@mui/material";
import ExpandableLI from "./ExpandableLI";
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import MenuContext from "../../context/MenuContext";
import { Savings, Storage, Diversity1, Diversity3, AccountBalanceWallet, AccountBalanceWalletOutlined } from '@mui/icons-material';
// import StorageIcon from '@mui/icons-material/Storage';


const DrawerContent = () => {

    const { setMobileOpen } = useContext(MenuContext);

    const databaseMenu = [
        { title: 'Videos', path: 'videos' },
        { title: 'Musicians', path: 'musicians' },
        { title: 'TextContent', path: 'texts' },
        { title: 'Events', path: 'events' }
    ];

    const developmentMenu = [
        { title: 'Donors', path: 'donors', iconInactive: <Diversity3 />, iconActive: <Diversity1 /> },
        { title: 'Grants', path: 'grants', iconInactive: <AccountBalanceWallet />, iconActive: <AccountBalanceWalletOutlined /> }
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
            <Divider />
        </>
    );
};

export default DrawerContent;