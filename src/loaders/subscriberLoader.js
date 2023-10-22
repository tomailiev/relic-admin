import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function subscriberLoader() {
    return downloadDocs(collections.subscribers)
        .then(docs => docs.map(doc => doc.email))
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}