import { redirect } from "react-router-dom";
import { userSchema } from "../../utils/yup/yup-schemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";

export default function signInAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return userSchema.validate(updates, { abortEarly: false })
        })
        .then(({email, password}) => {
            return signInWithEmailAndPassword(auth, email, password)
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
            return e;
        })
}