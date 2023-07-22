import { downloadOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function videoItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc(collections.videos, params.videoId);
}