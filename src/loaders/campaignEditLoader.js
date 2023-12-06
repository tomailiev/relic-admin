import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignEditLoader({ params }) {
    console.log(params.campaignId);
    return Promise.all([downloadOneDoc(collections.tags, 'allTags'), downloadOneDoc(collections.campaigns, params.campaignId)])
        .then(([allTags, campaign]) => {
            console.log(campaign);
            return {
                tags: Object.entries(allTags)
                    .filter(([key, _value]) => key !== 'id')
                    .sort(([, value1], [, value2]) => value2 - value1),
                campaign
            }
            // .map(([key, value]) => `${key} (${value})`)
        });
}