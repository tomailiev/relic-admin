import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function logDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.logId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.logs, docId)
        .then(() => redirect('/logs'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}