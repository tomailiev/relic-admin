import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function listDeleteAction({ _, params }) {
    const docId = params.listId;
    return deleteOneDoc(collections.lists, docId)
        .then(() => redirect('/lists'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}