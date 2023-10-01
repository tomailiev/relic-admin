import DonorItem from "../Donors/DonorItem";
import EventItem from "../Events/EventItem";
import GrantItem from "../Grants/GrantItem";
import MusicianItem from "../Musicians/MusicianItem";
import TextItem from "../Texts/TextItem";
import VideoItem from "../Videos/VideoItem";

const ItemSwitch = ({ item, itemType }) => {
    const itemComponents = {
        musician: <MusicianItem item={item} />,
        event: <EventItem item={item} />,
        text: <TextItem item={item} />,
        video: <VideoItem item={item} />,
        grant: <GrantItem item={item} />,
        donor: <DonorItem item={item} />
    }
    return itemComponents[itemType];
};

export default ItemSwitch;