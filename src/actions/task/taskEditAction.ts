import { ActionFunctionArgs, redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { Status } from "../../types/DB";
import { auth } from "../../utils/firebase/firebase-init";



export default async function taskEditAction({ request }: ActionFunctionArgs) {
    const doc = await request.json();
    const userId = auth.currentUser?.uid || '';
    const userName = auth.currentUser?.displayName || '';

    try {
        const { id: _, status: __, newUsers: ___, source: ____, ...rest } = doc;
        const status = doc.status.map((entry: Status) => {
            const updatedEntry = entry;
            console.log(entry);

            if (!entry.author) {
                updatedEntry.author = userName || userId;
            }
            if (!entry.datetime) {
                updatedEntry.datetime = Timestamp.fromDate(new Date());
            }
            if (!(entry.datetime instanceof Timestamp)) {
                updatedEntry.datetime = new Timestamp(entry.datetime.seconds, entry.datetime.nanoseconds);
            }
            return updatedEntry;
        })
        await uploadDoc({ ...rest, status, users: doc.newUsers.map(({ id }: { id: string }) => id) }, collections.tasks, doc.id, true);
        return redirect(`/tasks`);
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}