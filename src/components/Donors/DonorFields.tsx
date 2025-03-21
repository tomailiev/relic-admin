import { AutoAwesomeMotion, Email, LocationCity, LocationOn, Smartphone } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Donor } from "../../types/DB";

const DonorFields = ({ donor }: {donor: Donor}) => {

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
            {donor.lists && !!donor.lists.length && <ListItem>
                <ListItemIcon>
                    <AutoAwesomeMotion />
                </ListItemIcon>
                {donor.lists.map(list => (
                    <Typography pr={1}>
                        <Link key={list} to={`/lists/${list}`}>
                            {list}
                        </Link>
                    </Typography>
                ))}
            </ListItem>}
        </List>
    );
};

export default DonorFields;