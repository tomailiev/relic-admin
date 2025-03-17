import CampaignItem from "../Campaigns/CampaignItem";
import DonorItem from "../Donors/DonorItem";
import CSVItem from "../CSVs/CSVItem";
import EventItem from "../Events/EventItem";
import GrantItem from "../Grants/GrantItem";
import MusicianItem from "../Musicians/MusicianItem";
import SubscriberItem from "../Subscribers/SubscriberItem";
import TextItem from "../Texts/TextItem";
import VideoItem from "../Videos/VideoItem";
import EmailListItem from "../Lists/ListItem";
import { ItemTypeMap } from "../../types/DB";
import { Dispatch, SetStateAction } from "react";

const ItemSwitch = <T extends keyof ItemTypeMap>({ item, itemType, mutateItem, setEditable }: { itemType: T; item: ItemTypeMap[T]; setEditable: Dispatch<SetStateAction<boolean>>, mutateItem: Dispatch<SetStateAction<void>> }) => {
    
    const itemComponents = {
        musicians: <MusicianItem item={item} />,
        events: <EventItem item={item} />,
        texts: <TextItem item={item} />,
        videos: <VideoItem item={item} />,
        grants: <GrantItem item={item} />,
        donors: <DonorItem item={item} />,
        CSVs: <CSVItem item={item} mutateItem={mutateItem} />,
        subscribers: <SubscriberItem item={item} />,
        campaigns: <CampaignItem item={item} setEditable={setEditable} />,
        lists: <EmailListItem item={item} />
    }
    return itemComponents[itemType];
};

export default ItemSwitch;