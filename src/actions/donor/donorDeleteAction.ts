import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function donorDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.donorId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.donors, docId)
        .then(() => redirect('/donors'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}