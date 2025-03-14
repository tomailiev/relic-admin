import { acknowledgeDonor } from "../../utils/firebase/firebase-functions";

export default async function donorThankAction({ request }) {
    const doc = await request.json();
    try {
        const { data } = await acknowledgeDonor(doc);
        return data;
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}