import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function photoDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.photoId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.photos, docId)
        .then(() => redirect('/photos'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}