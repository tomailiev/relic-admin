import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyGrant from "../../vars/schematifyGrant";



export default async function grantEditAction({ request, params }) {
    const doc = await request.json();
    
    try {
        const { id: _, ...rest } = doc;
        const update = schematifyGrant(rest);
        await uploadDoc(update, collections.grants, doc.id, true);
        return redirect(`/grants`);
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}