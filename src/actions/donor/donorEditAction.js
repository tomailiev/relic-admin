import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyDonor from "../../vars/schematifyDonor";

export default async function donorEditAction({ request, params }) {
    
    try {
        const doc = await request.json();
        const { id: _, ...rest } = doc;
        await uploadDoc(schematifyDonor(rest), collections.donors, doc.id, true);
        return redirect(`/donors/${doc.id}`);
    } catch (e) {
        console.log(e);
        return Object.assign(e, { error: true, severity: 'error' });
    }
}