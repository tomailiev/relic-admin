import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignAddLoader() {
    return downloadOneDoc(collections.tags, 'allTags')
        .then(allTags => {
            return Object.entries(allTags)
                .filter(([key, value]) => key !== 'id')
                .sort(([key1, value1], [key2, value2]) => value2 - value1)
                .map(([key, value]) => `${key} (${value})`)
        });
}