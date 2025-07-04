import { ActionFunctionArgs, redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";
import { checkEmailVerificationStatus } from "../../utils/firebase/firebase-functions";

export default async function signInAction({ request, params }: ActionFunctionArgs) {
    try {
        const { email, password } = await request.json();
        const { data } = await checkEmailVerificationStatus({ email }) as { data: { verified: boolean } };
        if (data.verified) {
            await signInWithEmailAndPassword(auth, email, password);
            return redirect('/')
        }
        throw new Error('verify');
    } catch (e) {
        console.log(e);
        return e;
    }
}