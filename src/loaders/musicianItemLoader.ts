import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";

export default async function musicianItemLoader({ params }:LoaderFunctionArgs) {
    const docId = params.musicianId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const doc =  await downloadOneDoc('musicians', docId);
    if (!doc) return null;
    const imgSrc = new File([await getLink(doc.pic)], doc.pic.substring(doc.pic.lastIndexOf('/') + 1));
    return Object.assign(doc, { imgSrc })
}