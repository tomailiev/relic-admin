import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../utils/firebase/firebase-functions";
import { campaignSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import schematifyGrant from "../vars/schematifyGrant";
import { schematify } from "../vars/schemaFunctions";



export default async function campaignEditAction({ request, params }) {
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
        const { id: _, datetime: __, status: ___, ...rest } = doc;
        await uploadDoc(rest, collections.campaigns, doc.id, true);
        // const upload = await uploadDoc(Object.assign(updates, { status: 1, datetime: Timestamp.fromDate(new Date()) }), collections.campaigns);
        return redirect(`/campaigns/${doc.id}/edit/content`);
    } catch (e) {
        if (e.inner) {
            const errors = e.inner.reduce((p, c) => {
                return { ...p, [c.path]: c.message, errorType: 'Validation error' };
            }, {});
            console.log(errors);
            return errors
        }
        return Object.assign(e, { error: true, severity: 'error' });
    }
}