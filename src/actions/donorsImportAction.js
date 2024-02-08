// import { redirect } from "react-router-dom";
import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import { schematify } from "../vars/schemaFunctions";
import { arrayUnion } from "firebase/firestore";

export default async function donorsImportAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);

    if (doc.has('final')) {
        console.log('in action');
        try {
            const { newSubs } = schematify(updates, 'newSubs')
            const uploadQueue = newSubs.map(item => {
                return uploadDoc({
                    email: item.email.toLowerCase(),
                    firstName: item.firstName,
                    lastName: item.lastName,
                    import: 'donorlist',
                    id: item.email.toLowerCase(),
                    tags: arrayUnion('donor'),
                    opt_in_time: new Date().toISOString(),
                    location: item.location,
                    status: 1
                }, collections.subscribers, item.email.toLowerCase(), true)
            });
            await Promise.all(uploadQueue);
            return redirect('/subscribers')
        } catch (e) {
            return Object.assign(e, { error: true, severity: 'error' });
        }
    }
    // try {
    //     console.log(updates.fileName);
    //     const docs = await downloadDocs(collections.csv, ['import', '==', `CSVs/${updates.fileName}`])
    //     return docs;
    // } catch (e) {
    //     console.error(e)
    //     return Object.assign(e, { error: true, severity: 'error' });
    // }
}