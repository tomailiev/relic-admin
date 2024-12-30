import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function musicianDeleteAction({ _, params }) {
    const docId = params.musicianId;
    return deleteOneDoc(collections.musicians, docId)
        .then(() => redirect('/musicians'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}