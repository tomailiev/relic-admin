import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";
import { ActionFunctionArgs, redirect } from "react-router-dom";

export default function signOutAction({ request, params }: ActionFunctionArgs) {
    return signOut(auth)
        .then(() => redirect('/'))
        .catch(e => {
            console.log(e);
            return Object.assign(e, { error: true, severity: 'error' });
        })
}