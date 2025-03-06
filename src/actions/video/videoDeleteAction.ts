import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function videoDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.videoId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.videos, docId)
        .then(() => redirect('/videos'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}