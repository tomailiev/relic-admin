import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";



export default async function campaignEditAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();
    
    try {
        const { id: _, datetime: __, status: ___, ...rest } = doc;
        await uploadDoc(rest, collections.campaigns, doc.id, true);
        return redirect(`/campaigns/${doc.id}/edit/content`);
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}