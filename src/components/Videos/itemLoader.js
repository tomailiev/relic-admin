import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default async function videoItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc('videos', params.videoId);
}