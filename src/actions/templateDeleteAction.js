import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function templateDeleteAction({ _, params }) {
    const docId = params.templateId;
    return deleteOneDoc(collections.templates, docId)
        .then(() => redirect('/templates'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}