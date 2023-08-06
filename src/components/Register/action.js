import { redirect } from "react-router-dom";
import { newUserSchema } from "../../utils/yup/yup-schemas";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";

export default function registerAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return newUserSchema.validate(updates, { abortEarly: false })
        })
        .then(({email, password}) => {
            return createUserWithEmailAndPassword(auth, email, password)
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
}