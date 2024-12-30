import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textAddAction({ request, params }) {
    
    try {
        const updates = await request.json();
        const { key, value } = updates;
        await uploadDoc({ [key]: value }, collections.texts, 'allTexts', true);
        return redirect('/texts');
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}