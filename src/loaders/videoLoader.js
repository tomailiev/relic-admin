import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function videoLoader() {
    return await downloadDocs(collections.videos, [
        { type: 'where', value: ['featured', '!=', 0] },
        { type: 'orderBy', value: ['featured', 'desc'] }
    ]);
}