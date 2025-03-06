import { ActionFunction, ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyEvent from "../../vars/schematifyEvent";


const eventEditAction: ActionFunction<ActionFunctionArgs> = async ({ request }) => {
    const doc = await request.json();
    try {
        const { id: _, ...rest } = doc;
        await uploadDoc(schematifyEvent(rest), collections.events, doc.id, true);
        return redirect(`/events`);
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
};

export default eventEditAction