import { acknowledgeDonor } from "../utils/firebase/firebase-functions";

export default async function donorThankAction({ request, params }) {
    const doc = await request.json();
    try {
        const { data } = await acknowledgeDonor(doc);
        return data;
        // const upload = await uploadDoc(Object.assign(updates, { status: 1, datetime: Timestamp.fromDate(new Date()) }), collections.campaigns);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}