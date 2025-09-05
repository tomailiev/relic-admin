import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function donorItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.donorId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('donors', docId)
        .then(item => item ? item : null)
        .catch(e => {
            console.log(e);
            
            return { firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true };
        })
}