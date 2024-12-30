import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyGrant from "../../vars/schematifyGrant";



export default async function grantAddAction({ request, params }) {
    
    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifyGrant(updates, 'dueMonths'), collections.grants);
        console.log(upload);
        return redirect('/grants')
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}