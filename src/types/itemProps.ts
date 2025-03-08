import { Campaign, Donor, Event, List, Subscriber, Video, WithId } from "./DB"

type SubscriberWithTags = Omit<Subscriber, 'tags'> & { tags: [{ tag: string }] }

export type SubscriberItemProps = {
    item: SubscriberWithTags
};

export type EventItemProps = {
    item: Event
};

type ListWithNewMembers = Omit<List, 'members'> & { newMembers: (Donor | Subscriber)[], members: (Donor | Subscriber)[] }

export type ListItemProps = {
    item: ListWithNewMembers
};

export type VideoItemProps = {
    item: Video
}

export type DonorItemProps = {
    item: Donor
};

export type CampaignItemProps = {
    item: Campaign
};

