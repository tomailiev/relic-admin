import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import { newTextSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";

export default async function textEditAction({ request, params }) {
    const doc = await request.formData()
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            return await newTextSchema.validate(updates, { abortEarly: false })
        } catch (e) {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            return Object.assign(e, { errorType: 'Error' });
        }
    }

    try {
        const { key, value } = updates;
        await uploadDoc({ [key]: value }, collections.texts, 'allTexts', true);
        return redirect(`/texts/${key}`);
    } catch (e) {
        if (e.inner) {
            const errors = e.inner.reduce((p, c) => {
                return { ...p, [c.path]: c.message, errorType: 'Validation error' };
            }, {});
            console.log(errors);
            return errors
        }
        return Object.assign(e, { errorType: 'Error' });
    }
}