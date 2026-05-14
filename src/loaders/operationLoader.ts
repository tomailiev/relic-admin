import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function operationsLoader() {
    return downloadDocsV2('operations')
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}