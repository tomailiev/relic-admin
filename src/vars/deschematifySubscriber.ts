import { Subscriber } from "../types/DB";

export default function deschematifySubscriber(item: Subscriber) {
    const tags = item.tags.map(m => ({ tag: m }));
    const status = item.status === 1 ? 'Subscribed' : 'Unsubscribed';
    const history = item.history?.map((e) => ({...e, timestamp: e.timestamp.toDate()}))
    return { ...item, status, tags, history };
}