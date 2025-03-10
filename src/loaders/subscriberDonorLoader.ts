import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function subscriberDonorLoader() {
    return Promise.all([downloadDocsV2('donors'), downloadDocsV2('subscribers')])
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
}