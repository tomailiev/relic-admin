import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";



export default async function templateEditAction({ request, params }) {
    const doc = await request.json();
    try {
        const { id: _, datetime: __, status: ___, ...rest } = doc;
        await uploadDoc(rest, collections.templates, doc.id, true);
        // const upload = await uploadDoc(Object.assign(updates, { status: 1, datetime: Timestamp.fromDate(new Date()) }), collections.campaigns);
        return redirect(`/templates/${doc.id}/edit/content`);
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