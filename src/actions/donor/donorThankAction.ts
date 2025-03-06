import { ActionFunctionArgs } from "react-router-dom";
import { acknowledgeDonor } from "../../utils/firebase/firebase-functions";

export default async function donorThankAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();
    try {
        const { data } = await acknowledgeDonor(doc);
        return data;
    } catch (e: unknown) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}