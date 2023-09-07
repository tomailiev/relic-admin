import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function donorDeleteAction({ _, params }) {
    const docId = params.donorId;
    return deleteOneDoc(collections.donors, docId)
        .then(() => redirect('/donors'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}