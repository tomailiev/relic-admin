import DonorItem from "../Donors/DonorItem";
import CSVItem from "../Emails/CSVItem";
import EmailItem from "../Emails/CSVItem";
import EventItem from "../Events/EventItem";
import GrantItem from "../Grants/GrantItem";
import MusicianItem from "../Musicians/MusicianItem";
import TextItem from "../Texts/TextItem";
import VideoItem from "../Videos/VideoItem";

const ItemSwitch = ({ item, itemType }) => {
    const itemComponents = {
        musicians: <MusicianItem item={item} />,
        events: <EventItem item={item} />,
        texts: <TextItem item={item} />,
        videos: <VideoItem item={item} />,
        grants: <GrantItem item={item} />,
        donors: <DonorItem item={item} />,
        CSVs: <CSVItem item={item} />
    }
    return itemComponents[itemType];
};

export default ItemSwitch;