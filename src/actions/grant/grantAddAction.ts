import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyGrant from "../../vars/schematifyGrant";



export default async function grantAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const upload = await uploadDoc(schematifyGrant(updates), collections.grants);
        console.log(upload);
        return redirect('/grants')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}