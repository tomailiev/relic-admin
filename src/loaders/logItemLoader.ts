import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function logItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.logId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('logs', docId)
        // .then(item => item ? deschematifyGrant(item) : null)
        .catch(console.log);
}