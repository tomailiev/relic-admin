import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listSourceLoader({ source }) {
    try {
        return source === 'donors'
            ? { data: await downloadDocsV2(collections.donors, [{ type: 'condition', value: ['email', '!=', null] }]) }
            : { data: await downloadDocsV2(collections.subscribers, [{ type: 'condition', value: ['status', '==', 1] }]) }
    } catch (e) {
        return [{ name: 'Error', link: e.code, id: e.code, error: true }];
    }
}