import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import normalizePhoneNumber from "../../vars/normalizePhoneNumber";

export default async function musicianAddAction({ request }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const { imgSrc: _, ...updatedMusician } = updates;
        const phone = normalizePhoneNumber(updates.phone || '');
        const upload = await uploadDoc({ ...updatedMusician, phone }, collections.musicians);
        console.log(upload);
        return redirect('/musicians')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}