import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyEvent from "../../vars/schematifyEvent";


export default async function eventEditAction({ request, params }) {
    const doc = await request.json();
    try {
        const { id: _, ...rest } = doc;
        await uploadDoc(schematifyEvent(rest), collections.events, doc.id, true);
        return redirect(`/events/${doc.id}`);
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });

    }
}