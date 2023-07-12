import { Divider, List, Toolbar } from "@mui/material";
import ExpandableLI from "./ExpandableLI";

const DrawerContent = () => {

    const collectionsMenu = [
        { title: 'Videos', path: 'videos' },
        { title: 'Musicians', path: 'musicians' },
        { title: 'TextContent', path: 'texts' },
        { title: 'Events', path: 'events' }
    ]
    return (
        <>
            <Toolbar />
            <Divider />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {
                    ['Collections'].map((text, index) => (

                        <ExpandableLI key={text} menuTitle={text} subMenu={collectionsMenu} />
                    ))
                }
            </List >
            <Divider />
        </>
    );
};

export default DrawerContent;