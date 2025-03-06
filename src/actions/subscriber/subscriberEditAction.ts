import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifySubscriber from "../../vars/schematifySubscriber";



export default async function subscriberEditAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();

    try {
        const { id: _, history: __, ...rest } = doc;
        const update = schematifySubscriber(rest);
        await uploadDoc(update, collections.subscribers, doc.id, true);
        return redirect(`/subscribers`);
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}