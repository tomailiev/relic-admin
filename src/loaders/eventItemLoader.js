import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import { deschematifyEvent } from "../vars/deschematifyEvent";

export default async function eventItemLoader({ params }) {
    const doc = await downloadOneDoc(collections.events, params.eventId);
    if (!doc) return null;
    const imgSrc = new File([await getLink(doc.imageUrl)], doc.imageUrl.substring(doc.imageUrl.lastIndexOf('/') + 1));
    const programBook = new File([await getLink(doc.program)], doc.program.substring(doc.program.lastIndexOf('/') + 1));
    return Object.assign(deschematifyEvent(doc), { imgSrc, programBook })
}