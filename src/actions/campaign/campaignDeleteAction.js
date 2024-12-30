import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function campaignDeleteAction({ _, params }) {
    const docId = params.campaignId;
    return deleteOneDoc(collections.campaigns, docId)
        .then(() => redirect('/campaigns'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}