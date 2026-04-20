import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { auth } from "../../utils/firebase/firebase-init";



export default async function logAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const userId = auth.currentUser?.uid || '';
        const upload = await uploadDoc({ ...updates, userId }, collections.logs);
        console.log(upload);
        return redirect('/logs')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}