import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function listEditAction({ request, params }) {
    try {
        const doc = await request.json();
        const { id: _, ...rest } = doc;
        await uploadDoc(rest, collections.lists, doc.id, true);
        return redirect(`/lists`);
    } catch (e) {
        console.log(e);
        return Object.assign(e, { error: true, severity: 'error' });
    }
}