import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { videoSchema } from "../../utils/yup/yup-schemas";

export default function videoAction({ request, params }) {
    console.log(params);
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return videoSchema.validate(updates, { abortEarly: false })
        })
        .then(val => {
            return uploadDoc(val, 'videos')
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
}