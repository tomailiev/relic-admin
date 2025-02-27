import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listLoader() {
    return await downloadDocsV2(collections.lists) || [];
}