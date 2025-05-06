import { ActionFunctionArgs, redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";


export default async function campaignAddAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();

    try {
        const upload = await uploadDoc({ ...doc, status: 1, datetime: Timestamp.fromDate(new Date()) }, collections.campaigns);
        return upload?.id ? redirect(`/campaigns/${upload.id}/edit/content`) : redirect('/campaigns');
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}