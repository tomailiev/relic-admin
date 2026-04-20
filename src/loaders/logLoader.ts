import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import { auth } from "../utils/firebase/firebase-init";

export default function logLoader() {
    const userId = auth.currentUser?.uid;
    return downloadDocsV2('logs', [{ type: 'condition', value: ['userId', '==', userId] }])
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}