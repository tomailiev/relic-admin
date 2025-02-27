import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function donorLoader() {
    return downloadDocsV2(collections.donors)
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
}