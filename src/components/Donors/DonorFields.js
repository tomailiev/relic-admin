import { Email, LocationCity, LocationOn, Smartphone } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const DonorFields = ({ donor }) => {

    return (
        <List>
            {donor.email &&
                <Link to={`/subscribers/${donor.email}`}>
                    <ListItem>
                        <ListItemIcon>
                            <Email />
                        </ListItemIcon>
                        <ListItemText primary={donor.email} />
                    </ListItem>
                </Link>
            }
            {donor.address && <ListItem>
                <ListItemIcon>
                    <LocationOn />
                </ListItemIcon>
                <ListItemText primary={donor.address} />
            </ListItem>}
            {donor.location && <ListItem>
                <ListItemIcon>
                    <LocationCity />
                </ListItemIcon>
                <ListItemText primary={donor.location} />
            </ListItem>}
            {donor.phone && <ListItem>
                <ListItemIcon>
                    <Smartphone />
                </ListItemIcon>
                <ListItemText primary={donor.phone} />
            </ListItem>}
        </List>
    );
};

export default DonorFields;