import { Campaign, Donor, Event, List, Subscriber, Task, Video, WithId } from "./DB"

type SubscriberWithTags = Omit<Subscriber, 'tags'> & { tags: [{ tag: string }] }

export type SubscriberItemProps = {
    item: SubscriberWithTags
};

export type EventItemProps = {
    item: Event
};

export type ListWithNewMembers = Omit<List, 'members'> & { newMembers: (Donor | Subscriber)[], members: (Donor | Subscriber)[] }

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

export type TaskWithNewUsers = Task & { newUsers: { avatar: string, displayName: string, id: string, role: string }[], }

export type TaskItemProps = {
    item: TaskWithNewUsers
}

