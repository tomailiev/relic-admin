import { ActionFunctionArgs } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { arrayUnion } from "firebase/firestore";

export default async function taskStatusUpdateAction({ request }: ActionFunctionArgs) {
    try {
        const doc: { id: string, author: string, entry: string, archived: string | undefined } = await request.json();
        if (doc.archived) {
            await uploadDoc({ archived: 1 }, collections.tasks, doc.id, true);
            return { code: 'Success' };
        }
        const datetime = Timestamp.fromDate(new Date());
        await uploadDoc({ status: arrayUnion({ author: doc.author, entry: doc.entry, datetime }) }, collections.tasks, doc.id, true);
        return { code: 'Success' };
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ code: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}