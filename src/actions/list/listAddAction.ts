import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { serverTimestamp } from "firebase/firestore";
import { ListItemProps } from "../../types/itemProps";

export default async function listAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates: ListItemProps['item'] = await request.json();
        const { newMembers: _, ...rest } = updates
        const upload = await uploadDoc(Object.assign(rest, { datetime: serverTimestamp(), members: updates.newMembers.map(({ id }) => id), }), collections.lists);
        console.log(upload);
        return redirect('/lists');
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}