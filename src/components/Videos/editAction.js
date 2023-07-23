import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { videoSchema } from "../../utils/yup/yup-schemas";
import collections from "../../vars/collections";

export default async function videoEditAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            const validatedData = await videoSchema.validate(updates, { abortEarly: false })
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
        await uploadDoc(rest, collections.videos, updates.id, true);
        return redirect(`/videos/${updates.id}`);
    } catch (e) {
        console.log(e);
        return Object.assign(e, { errorType: 'Error' });
    }
}