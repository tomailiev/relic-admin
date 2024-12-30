import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";



export default async function campaignEditAction({ request, params }) {
    const doc = await request.json();

    try {
        const { id: _, datetime: __, status: ___, ...rest } = doc;
        await uploadDoc(rest, collections.campaigns, doc.id, true);
        return redirect(`/campaigns/${doc.id}/edit/content`);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}