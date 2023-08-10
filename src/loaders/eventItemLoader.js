import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function eventItemLoader({ params }) {
    // console.log(params);
    const doc = await downloadOneDoc(collections.events, params.eventId);
    const imgSrc = new File([await getLink(doc.imageUrl)], doc.imageUrl.substring(doc.imageUrl.lastIndexOf('/') + 1));
    return Object.assign(doc, { imgSrc })
}