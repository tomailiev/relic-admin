import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listSourceLoader({ source, name }) {
    try {
        return source === 'donors'
            ? { data: { members: await downloadDocsV2(collections.donors, [{ type: 'condition', value: ['email', '!=', ''] }]), source, name } }
            : { data: { members: await downloadDocsV2(collections.subscribers, [{ type: 'condition', value: ['status', '==', 1] }]), source, name } }
    } catch (e) {
        return [{ name: 'Error', link: e.code, id: e.code, error: true }];
    }
}