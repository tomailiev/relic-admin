import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function csvEditItemLoader({ params }) {
    try {
        const docs = await downloadDocs(collections.subscribers, ['import', '==', `CSVs/${params.CSVId}`])
        return { docs: docs.map(item => item.id), id: params.CSVId };
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}