import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function videoAddAction({ request }: ActionFunctionArgs) {
    
    try {
        const updates = await request.json();
        const upload = await uploadDoc(Object.assign(updates, { featured: Number(updates.featured) }), collections.videos);
        console.log(upload);
        return redirect('/videos');
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}