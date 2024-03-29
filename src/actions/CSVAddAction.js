// import { redirect } from "react-router-dom";
import { redirect } from "react-router-dom";
import { downloadDocs, uploadDoc, uploadFile } from "../utils/firebase/firebase-functions";
import { CSVSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import { schematify } from "../vars/schemaFunctions";

export default async function CSVAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            const validated = await CSVSchema.validate(updates, { abortEarly: false });
            const upload = await uploadFile(updates.csv, `CSVs/${updates.csv.name}`)
            console.log(upload);
            return validated;
        } catch (e) {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            console.error(e)
            return Object.assign(e, { error: true, severity: 'error' });
        }
    } else if (doc.has('final')) {
        try {
            console.log(updates.newSubs);
            const { newSubs } = schematify(updates, 'newSubs')
            const uploadQueue = newSubs.map(doc => {
                return uploadDoc({...doc, tags: doc.tags.replaceAll('"', '').toLowerCase().split(','), status: Number(doc.status), id: doc.email.toLowerCase(), email: doc.email.toLowerCase()}, collections.subscribers, doc.email.toLowerCase(), true)
            });
            await Promise.all(uploadQueue);
            return redirect('/subscribers')
        } catch (e) {
            return Object.assign(e, { error: true, severity: 'error' });
        }
    }
    try {
        console.log(updates.fileName);
        const docs = await downloadDocs(collections.csv, ['imported', '==', `CSVs/${updates.fileName}`])
        return docs;
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}