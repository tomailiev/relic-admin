import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifySubscriber from "../../vars/schematifySubscriber";



export default async function subscriberEditAction({ request, params }) {
    const doc = await request.json();

    try {
        const { id: _, history: __, ...rest } = doc;
        const update = schematifySubscriber(rest);
        await uploadDoc(update, collections.subscribers, doc.id, true);
        return redirect(`/subscribers`);
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });

    }
}