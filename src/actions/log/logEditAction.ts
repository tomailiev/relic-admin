import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";



export default async function logEditAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();

    try {
        const { id: _, ...rest } = doc;
        await uploadDoc(rest, collections.logs, doc.id, true);
        return redirect(`/logs`);
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}