import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function subscriberDonorLoader() {
    return Promise.all([downloadDocsV2(collections.donors), downloadDocsV2(collections.subscribers)])
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
}