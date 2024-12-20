// import { redirect } from "react-router-dom";
import { redirect } from "react-router-dom";
import { downloadDocsV2, uploadDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function CSVAddAction({ request, params }) {
    // const doc = await request.formData();
    // const updates = Object.fromEntries(doc);
    const updates = await request.json();
    if (updates.final) {
        try {
            console.log(updates.newSubs);

            const uploadQueue = updates.newSubs?.map(doc => {
                return uploadDoc({ ...doc, tags: doc.tags.replaceAll('"', '').toLowerCase().split(','), status: Number(doc.status), id: doc.email.toLowerCase(), email: doc.email.toLowerCase() }, collections.subscribers, doc.email.toLowerCase(), true)
            });
            await Promise.all(uploadQueue);
            return redirect('/subscribers');
        } catch (e) {
            return Object.assign(e, { error: true, severity: 'error' });
        }
    }
    try {
        const docs = await downloadDocsV2(collections.csv, [{ value: ['imported', '==', `CSVs/${updates.fileName}`], type: 'condition' }]);
        console.log(docs);

        return docs;
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}