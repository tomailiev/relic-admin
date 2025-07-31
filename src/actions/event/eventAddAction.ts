import { ActionFunctionArgs, redirect } from "react-router-dom";
import collections from "../../vars/collections";
import schematifyEvent from "../../vars/schematifyEvent";
import { uploadDoc } from "../../utils/firebase/firebase-functions";

export default async function eventAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const upload = schematifyEvent(updates);
        const id = encodeURI([upload.title, upload.subtitle, upload.dateDone.toDate().getFullYear()].join('-').replaceAll(' ', '-'));
        await uploadDoc(upload, collections.events, id);
        return redirect('/events')
    } catch (e) {
        if (e instanceof Error) {
            console.log(e);

            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}