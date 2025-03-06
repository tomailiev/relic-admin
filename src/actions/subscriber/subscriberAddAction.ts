import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifySubscriber from "../../vars/schematifySubscriber";



export default async function subscriberAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifySubscriber(updates), collections.subscribers, updates.email.toLowerCase(), true);
        console.log(upload);
        return redirect('/subscribers')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}