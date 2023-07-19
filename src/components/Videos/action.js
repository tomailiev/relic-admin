import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { videoSchema } from "../../utils/yup/yup-schemas";

export default async function videoAction({ request, params }) {
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
        const upload = await uploadDoc(updates, 'mock-videos');
        console.log(upload);
        return redirect('/videos');
    } catch (e) {
        console.log(e);
        return Object.assign(e, { errorType: 'Error' });
    }
}