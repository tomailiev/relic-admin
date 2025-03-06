import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function grantDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.grantId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.grants, docId)
        .then(() => redirect('/grants'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}