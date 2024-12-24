import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";


export default async function campaignAddAction({ request, params }) {
    const doc = await request.json();
    // const updates = Object.fromEntries(doc);
    // if (doc.get('intent') === 'preflight') {
    //     // const schema = schematify(updates, 'dueMonths');
    //     try {
    //         return await campaignSchema.validate(updates, { abortEarly: false });
    //     } catch (e) {
    //         if (e.inner) {
    //             const errors = e.inner.reduce((p, c) => {
    //                 return { ...p, [c.path]: c.message, errorType: 'Validation error' };
    //             }, {});
    //             console.log(errors);
    //             return errors
    //         }
    //         console.error(e)
    //         return Object.assign(e, { errorType: 'Error' });
    //     }
    // }

    try {
        const upload = await uploadDoc({ ...doc, status: 1, datetime: Timestamp.fromDate(new Date()) }, collections.campaigns);
        console.log(upload.id);
        return redirect(`/campaigns/${upload.id}/edit/content`);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}