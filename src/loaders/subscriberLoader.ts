import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function subscriberLoader() {
    return downloadDocsV2('subscribers')
        // .then(docs => ({ docs: docs.map(doc => doc.email) }))
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}