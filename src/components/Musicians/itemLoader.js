import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default async function musicianItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc('musicians', params.musicianId);
}