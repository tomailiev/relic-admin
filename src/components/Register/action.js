import { newUserSchema } from "../../utils/yup/yup-schemas";
import { registerUser } from "../../utils/firebase/firebase-functions";

export default function registerAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return newUserSchema.validate(updates, { abortEarly: false })
        })
        .then(({ email, password }) => {
            // return createUserWithEmailAndPassword(auth, email, password)
            return registerUser({ email, password })
        })
        .then(({ data }) => {
            console.log(data);
            return { result: 'Success' }
        })
        .catch(e => {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            return Object.assign({code: e.message}, { errorType: 'Error' });
        })
}