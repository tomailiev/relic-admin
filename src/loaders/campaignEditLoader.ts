import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignEditLoader({ params }: LoaderFunctionArgs) {
    const docId = params.campaignId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return Promise.all([downloadDocsV2('lists'), downloadOneDoc('campaigns', docId)])
        .then(([emailLists, campaign]) => {
            return {
                lists: emailLists?.map(({ id, name }) => ({ value: id, display: name })) || [],
                campaign
            }
            // .map(([key, value]) => `${key} (${value})`)
        });
}