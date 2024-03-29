import { redirect } from "react-router-dom";
import { getMjml, uploadDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";



export default async function campaignEditContentAction({ request, params }) {
    try {
        const res = await request.json();
        if (res.id) {
            const { id: _, datetime: __, ...rest } = res;
            await uploadDoc(rest, collections.campaigns, res.id, true);
            return redirect(`/campaigns/${res.id}`)
        }
        const doc = await getMjml({ components: res.components });
        return doc.data;
    } catch (error) {
        console.log('error:' + error);
        const data = { errors: [{ message: error }] };
        return { data };
    }
    // try {
    //     const upload = await uploadDoc(Object.assign(updates, { status: 1, datetime: Timestamp.fromDate(new Date()) }), collections.campaigns);
    //     console.log(upload.id);
    //     return redirect(`/campaigns/${upload.id}/edit/content`);
    // } catch (e) {
    //     if (e.inner) {
    //         const errors = e.inner.reduce((p, c) => {
    //             return { ...p, [c.path]: c.message, errorType: 'Validation error' };
    //         }, {});
    //         console.log(errors);
    //         return errors
    //     }
    //     return Object.assign(e, { error: true, severity: 'error' });
    // }
}