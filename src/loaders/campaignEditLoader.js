import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignEditLoader({ params }) {
    return Promise.all([downloadDocsV2(collections.lists), downloadOneDoc(collections.campaigns, params.campaignId)])
        .then(([emailLists, campaign]) => {
            return {
                lists: emailLists?.map(({ id, name }) => ({ value: id, display: name })) || [],
                campaign
            }
            // .map(([key, value]) => `${key} (${value})`)
        });
}