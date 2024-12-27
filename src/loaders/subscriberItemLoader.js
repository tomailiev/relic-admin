import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import deschematifySubscriber from "../vars/deschematifySubscriber";

export default async function subscriberItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc(collections.subscribers, params.subscriberId)
        .then(deschematifySubscriber)
}