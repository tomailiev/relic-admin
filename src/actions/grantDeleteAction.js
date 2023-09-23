import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function grantDeleteAction({ _, params }) {
    const docId = params.grantId;
    return deleteOneDoc(collections.grants, docId)
        .then(() => redirect('/grants'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}