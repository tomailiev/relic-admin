import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";


export default async function campaignAddAction({ request, params }) {
    const doc = await request.json();
    
    try {
        const upload = await uploadDoc({ ...doc, status: 1, datetime: Timestamp.fromDate(new Date()) }, collections.campaigns);
        return redirect(`/campaigns/${upload.id}/edit/content`);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}