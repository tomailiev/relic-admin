import { downloadDocs } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function grantLoader() {
    return downloadDocs(collections.grants)
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}