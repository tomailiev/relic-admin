import { Box, Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { NavLink } from "react-router-dom";

const SubscriberActionBox = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pb: 1 }}>
            <Button variant="outlined" onClick={handleClick}>
                Import...
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/CSVs/add'} style={{ textDecoration: 'none' }}>
                        Import CSV
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/subscribers/import-donors'} style={{ textDecoration: 'none' }}>
                        Import Donors
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <NavLink to={'/subscribers/import-operation'} style={{ textDecoration: 'none' }}>
                        Import from Event
                    </NavLink>
                </MenuItem>
            </Menu>
            <Box sx={{ flex: '1 1 auto' }} />
        </Box>
    );
};

export default SubscriberActionBox;