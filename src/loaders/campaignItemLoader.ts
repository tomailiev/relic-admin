import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.campaignId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return downloadOneDoc('campaigns', docId);
}