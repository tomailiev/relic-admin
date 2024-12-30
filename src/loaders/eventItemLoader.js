import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import { deschematifyEvent } from "../vars/deschematifyEvent";

export default async function eventItemLoader({ params }) {
    // console.log(params);
    const doc = await downloadOneDoc(collections.events, params.eventId);
    const imgSrc = new File([await getLink(doc.imageUrl)], doc.imageUrl.substring(doc.imageUrl.lastIndexOf('/') + 1));
    return Object.assign(deschematifyEvent(doc), { imgSrc })
}