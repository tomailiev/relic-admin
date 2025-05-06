import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function grantLoader() {
    return downloadDocsV2('grants')
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}