import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function csvEditItemLoader({ params }) {
    try {
        const docs = await downloadDocsV2(collections.subscribers, [{ value: ['imported', '==', `CSVs/${params.CSVId}`], type: 'condition' }])
        return { docs, id: params.CSVId };
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}