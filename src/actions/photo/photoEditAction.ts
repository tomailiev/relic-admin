import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function photoEditAction({ request, params }: ActionFunctionArgs) {
    try {
        const doc = await request.json();
        const { id: _, ...rest } = doc;
        await uploadDoc(rest, collections.photos, doc.id, true);
        return redirect(`/photos`);
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}