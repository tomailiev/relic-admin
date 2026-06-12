import { ActionFunctionArgs } from "react-router-dom";
import { uploadDoc, verifyOrReset } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function updateProfileAction({ request, params }: ActionFunctionArgs) {
    try {
        const doc = await request.json();
        
        if (doc.reason && doc.reason === 'reset') {
            const email = doc.email;
            if (!email) {
                return { code: 'error' };
            }
            const { data } = await verifyOrReset({ email, reason: doc.reason }) as { data: { code: string } };
            return {...data, message: 'Reset link sent. Check your email.'};
        }

        const { id: _, ...rest } = doc;
        if (!doc.id) {
            return { code: 'error' };
        }
        await uploadDoc(rest, collections.users, doc.id, true);
        return { code: 'Success', message: 'Profile update successful' };
    } catch (e) {        
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}