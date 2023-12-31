import { Email, Face, LocationCity, LocationOn, Smartphone } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const DonorFields = ({ donor }) => {

    return (
        <List>
            <ListItem>
                <ListItemIcon>
                    <Face />
                </ListItemIcon>
                <ListItemText primary={`${donor.firstName} ${donor.lastName}`} primaryTypographyProps={{variant: 'h5'}} />
            </ListItem>
            {donor.email && <ListItem>
                <ListItemIcon>
                    <Email />
                </ListItemIcon>
                <ListItemText primary={donor.email} />
            </ListItem>}
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