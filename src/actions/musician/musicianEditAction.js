import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function musicianEditAction({ request, params }) {
    try {
        const doc = await request.json();
        const { id: _, ...rest } = doc;
        const featured = Number(doc.featured);
        await uploadDoc({ ...rest, featured }, collections.musicians, doc.id, true);
        return redirect(`/musicians/${doc.id}`);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}