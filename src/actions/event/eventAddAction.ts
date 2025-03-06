import { ActionFunctionArgs, redirect } from "react-router-dom";
import collections from "../../vars/collections";
import schematifyEvent from "../../vars/schematifyEvent";
import { uploadDoc } from "../../utils/firebase/firebase-functions";

export default async function eventAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifyEvent(updates), collections.events);
        console.log(upload);
        return redirect('/events')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}