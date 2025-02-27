import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-init";
import { redirect } from "react-router-dom";

export default function signOutAction({ _request, _params }) {
    return signOut(auth)
        .then(() => redirect('/'))
        .catch(e => {
            console.log(e);
            return Object.assign(e, { error: true, severity: 'error' });
        })
}