import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function eventDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.eventId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.events, docId)
        .then(() => redirect('/events'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}