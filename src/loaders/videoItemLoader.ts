import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function videoItemLoader({ params }: LoaderFunctionArgs) {
    return await downloadOneDoc('videos', params.videoId);
}