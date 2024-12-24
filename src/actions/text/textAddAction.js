import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textAddAction({ request, params }) {
    
    try {
        const updates = await request.json();
        const { key, value } = updates;
        const upload = await uploadDoc({ [key]: value }, collections.texts, 'allTexts', true);
        console.log(upload);
        return redirect('/texts');
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}