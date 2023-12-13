import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../utils/firebase/firebase-functions";
import { campaignSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import schematifyGrant from "../vars/schematifyGrant";
import { schematify } from "../vars/schemaFunctions";



export default async function campaignAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        // const schema = schematify(updates, 'dueMonths');
        try {
            return await campaignSchema.validate(updates, { abortEarly: false });
        } catch (e) {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            console.error(e)
            return Object.assign(e, { errorType: 'Error' });
        }
    }

    try {
        const upload = await uploadDoc(Object.assign(updates, { status: 1, datetime: Timestamp.fromDate(new Date()) }), collections.campaigns);
        console.log(upload.id);
        return redirect(`/campaigns/${upload.id}/edit/content`);
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