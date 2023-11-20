import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function subscriberItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc(collections.subscribers, params.subscriberId);
}