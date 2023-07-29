import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { musicianSchema } from "../../utils/yup/yup-schemas";
import collections from "../../vars/collections";

export default async function musicianEditAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            const validatedData = await musicianSchema.validate(updates, { abortEarly: false });
            return validatedData;
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
        const { id: _, ...rest } = updates;
        await uploadDoc(rest, collections.musicians, updates.id, true);
        return redirect(`/musicians/${updates.id}`);
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