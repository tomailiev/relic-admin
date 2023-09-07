import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function eventDeleteAction({ _, params }) {
    const docId = params.eventId;
    return deleteOneDoc(collections.events, docId)
        .then(() => redirect('/events'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}