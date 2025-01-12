// import { redirect } from "react-router-dom";
import { redirect } from "react-router-dom";
// import { uploadDoc } from "../../utils/firebase/firebase-functions";
// import collections from "../../vars/collections";
// import { schematify } from "../../vars/schemaFunctions";
// import { arrayUnion } from "firebase/firestore";

export default async function donorsImportAction({ request, params }) {
    const docs = await request.json();
    // const updates = Object.fromEntries(doc);

    if (docs) {
        console.log(docs);
        return redirect('/subscribers')
        // try {
        //     const { newSubs } = schematify(updates, 'newSubs')
        //     const uploadQueue = newSubs.map(item => {
        //         return uploadDoc({
        //             email: item.email.toLowerCase(),
        //             firstName: item.firstName,
        //             lastName: item.lastName,
        //             imported: 'donorlist',
        //             id: item.email.toLowerCase(),
        //             tags: arrayUnion('donor'),
        //             location: item.location,
        //             status: 1
        //         }, collections.subscribers, item.email.toLowerCase(), true)
        //     });
        //     await Promise.all(uploadQueue);
        //     return redirect('/subscribers')
        // } catch (e) {
        //     return Object.assign(e, { error: true, severity: 'error' });
        // }
    }

}