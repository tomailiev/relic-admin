import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default function campaignItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.campaignId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return downloadOneDoc('campaigns', docId);
}