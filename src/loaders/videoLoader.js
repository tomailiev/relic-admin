import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function videoLoader() {
    return await downloadDocsV2(collections.videos, [{ value: ['featured', 'desc'], type: 'sorting' }]);
}