import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function donorItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.donorId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('donors', docId);
}