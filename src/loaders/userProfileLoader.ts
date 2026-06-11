import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import { auth } from "../utils/firebase/firebase-init";

export default async function userProfileLoader({ params }: LoaderFunctionArgs) {
    const docId = auth.currentUser?.uid;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('users', docId);
}