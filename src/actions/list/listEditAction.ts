import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { ListItemProps } from "../../types/itemProps";

export default async function listEditAction({ request }: ActionFunctionArgs) {
    try {
        const doc: ListItemProps['item'] = await request.json();
        const { id: _, datetime: __, newMembers: ___, ...rest } = doc;
        await uploadDoc({ ...rest, members: doc.newMembers.map(({ id }) => id) }, collections.lists, doc.id, true);
        return redirect(`/lists`);
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}