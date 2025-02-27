import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function videoAddAction({ request, params }) {
    
    try {
        const updates = await request.json();
        const upload = await uploadDoc(Object.assign(updates, { featured: Number(updates.featured) }), collections.videos);
        console.log(upload);
        return redirect('/videos');
    } catch (e) {
        console.log(e);
        return Object.assign(e, { error: true, severity: 'error' });
    }
}