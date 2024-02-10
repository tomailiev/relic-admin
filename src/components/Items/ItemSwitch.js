import CampaignItem from "../Campaigns/CampaignItem";
import DonorItem from "../Donors/DonorItem";
import CSVItem from "../Emails/CSVItem";
import EventItem from "../Events/EventItem";
import GrantItem from "../Grants/GrantItem";
import MusicianItem from "../Musicians/MusicianItem";
import SubscriberItem from "../Subscribers/SubscriberItem";
import TextItem from "../Texts/TextItem";
import VideoItem from "../Videos/VideoItem";

const ItemSwitch = ({ item, itemType, mutateItem, setEditable }) => {
    const itemComponents = {
        musicians: <MusicianItem item={item} />,
        events: <EventItem item={item} />,
        texts: <TextItem item={item} />,
        videos: <VideoItem item={item} />,
        grants: <GrantItem item={item} />,
        donors: <DonorItem item={item} />,
        CSVs: <CSVItem item={item} mutateItem={mutateItem} />,
        subscribers: <SubscriberItem item={item} />,
        campaigns: <CampaignItem item={item} setEditable={setEditable} />
    }
    return itemComponents[itemType];
};

export default ItemSwitch;