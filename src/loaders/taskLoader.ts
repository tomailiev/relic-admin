import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function taskLoader() {
    return downloadDocsV2('tasks')
        .catch(e => {
            return [{ name: 'Error', link: e.code, id: e.code, error: true }];
        })
}