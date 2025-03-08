import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import deschematifyGrant from "../vars/deschematifyGrant";

export default async function grantItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.grantId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('grants', docId)
        .then(item => item && deschematifyGrant(item))
}