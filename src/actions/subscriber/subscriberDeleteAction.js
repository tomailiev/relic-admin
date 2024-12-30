import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function subscriberDeleteAction({ _, params }) {
    const docId = params.subscriberId;
    return deleteOneDoc(collections.subscribers, docId)
        .then(() => redirect('/subscribers'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}