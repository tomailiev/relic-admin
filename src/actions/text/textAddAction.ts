import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textAddAction({ request, params }: ActionFunctionArgs) {
    
    try {
        const updates = await request.json();
        const { key, value } = updates;
        await uploadDoc({ [key]: value }, collections.texts, 'allTexts', true);
        return redirect('/texts');
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}