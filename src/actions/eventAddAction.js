import { redirect } from "react-router-dom";
import collections from "../vars/collections";
import schematifyEvent from "../vars/schematifyEvent";
import { uploadDoc } from "../utils/firebase/firebase-functions";

export default async function eventAddAction({ request, params }) {
    
    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifyEvent(updates), collections.events);
        console.log(upload);
        return redirect('/events')
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}