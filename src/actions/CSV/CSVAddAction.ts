// import { redirect } from "react-router-dom";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { downloadDocsV2, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function CSVAddAction({ request, params }: ActionFunctionArgs) {
    // const doc = await request.formData();
    // const updates = Object.fromEntries(doc);
    const updates = await request.json();
    if (updates.final) {
        try {
            console.log(updates.newSubs);

            const uploadQueue = updates.newSubs?.map((doc: any) => {
                return uploadDoc({ ...doc, tags: doc.tags.replaceAll('"', '').toLowerCase().split(','), status: Number(doc.status), id: doc.email.toLowerCase(), email: doc.email.toLowerCase() }, collections.subscribers, doc.email.toLowerCase(), true)
            });
            await Promise.all(uploadQueue);
            return redirect('/subscribers');
        } catch (e) {
            if (e instanceof Error) {
                return Object.assign({ message: e.message }, { error: true, severity: 'error' });
            }
            return { error: true, severity: 'error', message: 'Unknown error' };
        }
    }
    try {
        const docs = await downloadDocsV2('CSVs', [{ value: ['imported', '==', `CSVs/${updates.fileName}`], type: 'condition' }]);
        console.log(docs);

        return docs;
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}