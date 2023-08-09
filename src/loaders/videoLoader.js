import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function videoLoader() {
    return await downloadDocs(collections.videos, ['featured', '!=', 0], ['featured', 'desc']);
}