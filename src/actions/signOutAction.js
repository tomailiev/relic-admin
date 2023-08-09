import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase/firebase-init";
import { redirect } from "react-router-dom";

export default function signOutAction({ request, _params }) {
    console.log(request);
    return signOut(auth)
        .then(() => redirect('/'))
        .catch(e => {
            console.log(e);
            return e;
        })
}