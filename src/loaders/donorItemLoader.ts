import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function donorItemLoader({ params }) {
    return await downloadOneDoc(collections.donors, params.donorId);
}