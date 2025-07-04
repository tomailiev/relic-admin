import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";
import { deschematifyEvent } from "../vars/deschematifyEvent";

export default async function eventItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.eventId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const doc = await downloadOneDoc('events', docId);
    if (!doc) return null;
    const imgSrc = new File([await getLink(doc.imageUrl)], doc.imageUrl.substring(doc.imageUrl.lastIndexOf('/') + 1));
    const programBook = doc.program && new File([await getLink(doc.program)], doc.program.substring(doc.program.lastIndexOf('/') + 1));
    return Object.assign(deschematifyEvent(doc), { imgSrc, programBook })
}