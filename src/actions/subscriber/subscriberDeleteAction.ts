import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function subscriberDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.subscriberId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.subscribers, docId)
        .then(() => redirect('/subscribers'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}