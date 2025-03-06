import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import schematifyGrant from "../../vars/schematifyGrant";



export default async function grantEditAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();

    try {
        const { id: _, ...rest } = doc;
        const update = schematifyGrant(rest);
        await uploadDoc(update, collections.grants, doc.id, true);
        return redirect(`/grants`);
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}