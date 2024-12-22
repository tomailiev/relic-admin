import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import schematifyDonor from "../vars/schematifyDonor";



export default async function donorAddAction({ request, params }) {
    try {
        const doc = await request.json();
        console.log(schematifyDonor(doc));
        await uploadDoc(schematifyDonor(doc), collections.donors)
        return redirect('/donors');
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}