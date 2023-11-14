import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function donorsSubsLoader() {
    return Promise.all([downloadDocs(collections.donors), downloadDocs(collections.subscribers)])
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
}