import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyDonor from "../../vars/schematifyDonor";



export default async function donorAddAction({ request, params }: ActionFunctionArgs) {
    try {
        const doc = await request.json();
        console.log(schematifyDonor(doc));
        await uploadDoc(schematifyDonor(doc), collections.donors)
        return redirect('/donors');
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}