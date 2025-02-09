import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { serverTimestamp } from "firebase/firestore";

export default async function listAddAction({ request, params }) {

    try {
        const updates = await request.json();
        const { newMembers: _, ...rest } = updates
        const upload = await uploadDoc(Object.assign(rest, { datetime: serverTimestamp(), members: updates.newMembers.map(({ email }) => email), }), collections.lists);
        console.log(upload);
        return redirect('/lists');
    } catch (e) {
        console.log(e);
        return Object.assign(e, { error: true, severity: 'error' });
    }
}