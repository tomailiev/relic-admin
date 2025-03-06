import { ActionFunctionArgs, redirect } from "react-router-dom";
import { userSchema } from "../../utils/yup/yup-schemas";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";
import { checkEmailVerificationStatus } from "../../utils/firebase/firebase-functions";

export default async function signInAction({ request, params }: ActionFunctionArgs) {
    try {
        const doc = await request.formData();
        const updates = Object.fromEntries(doc);
        const { email, password } = await userSchema.validate(updates, { abortEarly: false });
        const { data } = await checkEmailVerificationStatus({ email });
        if (data.verified) {
            await signInWithEmailAndPassword(auth, email, password);
            return redirect('/')
        }
        throw new Error('verify');
    } catch (e) {
        if (e.inner) {
            const errors = e.inner.reduce((p, c) => {
                return { ...p, [c.path]: c.message, errorType: 'Validation error' };
            }, {});
            console.log(errors);
            return errors
        }
        console.log(e);
        return Object.assign(e, { errorType: 'Error' });

    }
}