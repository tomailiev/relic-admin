import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifySubscriber from "../../vars/schematifySubscriber";



export default async function subscriberAddAction({ request, params }) {

    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifySubscriber(updates), collections.subscribers, updates.email.toLowerCase(), true);
        console.log(upload);
        return redirect('/subscribers')
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