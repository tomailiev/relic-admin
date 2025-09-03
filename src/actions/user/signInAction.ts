import { ActionFunctionArgs, redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";
import { checkEmailVerificationStatus } from "../../utils/firebase/firebase-functions";

export default async function signInAction({ request, params,  }: ActionFunctionArgs) {
    try {
        
        const { email, password, location } = await request.json();
        
        const { data } = await checkEmailVerificationStatus({ email }) as { data: { verified: boolean } };
        if (data.verified) {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(location);
            return redirect(location || '/');
        }
        throw new Error('verify');
    } catch (e) {
        console.log(e);
        return e;
    }
}