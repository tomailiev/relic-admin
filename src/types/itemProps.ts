import { Donor, Event, List, Subscriber, Video, WithId } from "./DB"

type SubscriberWithTags = Omit<Subscriber, 'tags'> & { tags: [{ tag: string }] }

export type SubscriberItemProps = {
    item: SubscriberWithTags & WithId
};

export type EventItemProps = {
    item: Event & WithId
};

type ListWithNewMembers = Omit<List, 'members'> & { newMembers: [Donor | Subscriber], members: [Donor | Subscriber] }

export type ListItemProps = {
    item: ListWithNewMembers & WithId
};

export type VideoItemProps = {
    item: Video & WithId
}