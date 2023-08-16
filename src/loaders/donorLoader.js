import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function donorLoader() {
    return await downloadDocs(collections.donors);
}