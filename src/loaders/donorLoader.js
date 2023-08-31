import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function donorLoader() {
    return downloadDocs(collections.donors)
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
}