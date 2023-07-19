import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { newTextSchema } from "../../utils/yup/yup-schemas";

export default function textAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return newTextSchema.validate(updates, { abortEarly: false })
        })
        .then(({ key, value }) => {
            return uploadDoc({ [key]: value }, 'mock-text', 'allTexts', true)
        })
        .then(doc => {
            console.log(doc);
            return redirect('/')
        })
        .catch(e => {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            return Object.assign(e, { errorType: 'Error' });
        })
    // uploadDoc('textContent', 'new-doc')
    //     .then(doc => console.log(doc.id));
}