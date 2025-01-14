import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import deschematifyGrant from "../vars/deschematifyGrant";

export default async function grantItemLoader({ params }) {
    return await downloadOneDoc(collections.grants, params.grantId)
        .then(item => item && deschematifyGrant(item))
}