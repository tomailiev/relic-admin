import { downloadOneDoc, getLink } from "../../utils/firebase/firebase-functions";

export default async function musicianItemLoader({ params }) {
    // console.log(params);
    const doc =  await downloadOneDoc('musicians', params.musicianId);
    const imgSrc = await getLink(doc.pic);
    return Object.assign(doc, { imgSrc })
}