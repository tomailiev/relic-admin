import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { textContentSchema } from "../../utils/yup/yup-schemas";

export default function textAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return textContentSchema.validate(updates, { abortEarly: false })
        })
        .then(val => {
            return uploadDoc(val, 'mock-text', 'new-doc')
        })
        .then(doc => {
            console.log(doc);
            return redirect('/')
        })
        .catch(e => {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message };
                }, {});
                console.log(errors);
                return errors
            }
        })
    // uploadDoc('textContent', 'new-doc')
    //     .then(doc => console.log(doc.id));
}