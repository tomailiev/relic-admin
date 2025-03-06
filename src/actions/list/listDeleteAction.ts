import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function listDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.listId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.lists, docId)
        .then(() => redirect('/lists'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}