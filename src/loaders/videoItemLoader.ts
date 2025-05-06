import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function videoItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.videoId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('videos', docId);
}