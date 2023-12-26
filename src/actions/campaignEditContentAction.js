import { redirect } from "react-router-dom";
import { Timestamp, getMjml, uploadDoc } from "../utils/firebase/firebase-functions";
import { campaignSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import schematifyGrant from "../vars/schematifyGrant";
import { schematify } from "../vars/schemaFunctions";



export default async function campaignEditContentAction({ request, params }) {
    return request.json()
        .then(res => {
            if (res.id) {
                const { id: _, datetime: __, ...rest } = res;
                return uploadDoc(rest, collections.campaigns, res.id, true);
            }
            return getMjml({ components: res.components });
        })
        .then(doc => {
            return doc ? doc.data : redirect('/campaigns');
        })
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