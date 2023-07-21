import { downloadOneDoc, getLink } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function eventItemLoader({ params }) {
    // console.log(params);
    const doc = await downloadOneDoc(collections.events, params.eventId);
    const imgSrc = await getLink(doc.imageUrl);
    return Object.assign(doc, { imgSrc })
    
}