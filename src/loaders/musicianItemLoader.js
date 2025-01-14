import { downloadOneDoc, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function musicianItemLoader({ params }) {
    const doc =  await downloadOneDoc(collections.musicians, params.musicianId);
    if (!doc) return null;
    const imgSrc = new File([await getLink(doc.pic)], doc.pic.substring(doc.pic.lastIndexOf('/') + 1));
    return Object.assign(doc, { imgSrc })
}