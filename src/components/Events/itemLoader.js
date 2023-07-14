import { downloadOneDoc, getLink } from "../../utils/firebase/firebase-functions";

export default async function eventItemLoader({ params }) {
    // console.log(params);
    const doc = await downloadOneDoc('events', params.eventId);
    const imgSrc = await getLink(doc.imageUrl);
    return Object.assign(doc, { imgSrc })
    
}