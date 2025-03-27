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
import { AnyItemType, ItemTypeMap } from "../../types/DB";
import { Dispatch, SetStateAction } from "react";


const ItemSwitch = <T extends keyof ItemTypeMap>({ item, itemType, mutateItem, setEditable }: { itemType: T; item: ItemTypeMap[T] | null; setEditable?: Dispatch<SetStateAction<boolean>>, mutateItem?: Dispatch<SetStateAction<AnyItemType | null>> }) => {

    const itemComponents= {
        musicians: <MusicianItem item={item as ItemTypeMap['musicians']} />,
        events: <EventItem item={item as ItemTypeMap['events']} />,
        texts: <TextItem item={item as ItemTypeMap['texts']} />,
        videos: <VideoItem item={item as ItemTypeMap['videos']} />,
        grants: <GrantItem item={item as ItemTypeMap['deschematifiedGrants']} />,
        donors: <DonorItem item={item as ItemTypeMap['donors']} />,
        CSVs: <CSVItem item={item as ItemTypeMap['CSVs']} mutateItem={mutateItem} />,
        subscribers: <SubscriberItem item={item as ItemTypeMap['deschematifiedSubscribers']} />,
        campaigns: <CampaignItem item={item as ItemTypeMap['campaigns']} setEditable={setEditable} />,
        lists: <EmailListItem item={item as ItemTypeMap['listsWithNewMembers']} />
    }
    return itemComponents[itemType];
};

export default ItemSwitch;