import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textEditAction({ request, params }) {
    try {
        const doc = await request.json();
        const { key, value } = doc;
        await uploadDoc({ [key]: value }, collections.texts, 'allTexts', true);
        return redirect(`/texts/${key}`);
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}