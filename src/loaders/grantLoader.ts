import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function grantLoader() {
    return downloadDocsV2(collections.grants)
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}