import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function grantItemLoader({ params }) {
    // console.log(params);
    return await downloadOneDoc(collections.grants, params.grantId);
}