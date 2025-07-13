import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";

export default async function photoItemLoader({ params }:LoaderFunctionArgs) {
    const docId = params.photoId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const doc =  await downloadOneDoc('photos', docId);
    if (!doc) return null;
    const imgSrc = new File([await getLink(doc.path)], doc.path.substring(doc.path.lastIndexOf('/') + 1));
    return Object.assign(doc, { imgSrc })
}