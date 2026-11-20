import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function stripeChargeItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.stripeChargeId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const doc = await downloadOneDoc('stripeCharges', docId);
    if (!doc) return null;
    return doc;
}