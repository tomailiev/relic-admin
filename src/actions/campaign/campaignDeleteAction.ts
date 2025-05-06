import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function campaignDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.campaignId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.campaigns, docId)
        .then(() => redirect('/campaigns'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}