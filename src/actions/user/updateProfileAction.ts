import { ActionFunctionArgs } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function updateProfileAction({ request, params }: ActionFunctionArgs) {
    try {
        const doc = await request.json();
        const { id: _, ...rest } = doc;
        await uploadDoc(rest, collections.users, doc.id, true);
        return { code: 'success' };
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}