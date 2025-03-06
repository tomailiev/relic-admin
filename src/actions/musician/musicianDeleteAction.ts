import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function musicianDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.musicianId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.musicians, docId)
        .then(() => redirect('/musicians'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}