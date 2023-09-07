import { redirect } from "react-router-dom";
import { getVideoInfo, uploadDoc } from "../utils/firebase/firebase-functions";
import { initialVideoSchema, videoSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";

export default async function videoAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            const isInitialSubmission = !doc.get('title');

            if (isInitialSubmission) {
                const validatedData = await initialVideoSchema.validate(updates, { abortEarly: false });
                const { data } = await getVideoInfo({ url: updates.youtubeLink })
                return { ...data, featured: validatedData.featured };
            }
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
        const upload = await uploadDoc(updates, collections.videos);
        console.log(upload);
        return redirect('/videos');
    } catch (e) {
        console.log(e);
        return Object.assign(e, { error: true, severity: 'error' });
    }
}