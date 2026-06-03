import { ActionFunctionArgs, redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { auth } from "../../utils/firebase/firebase-init";
import { TaskWithNewUsers } from "../../types/itemProps";



export default async function taskAddAction({ request, params }: ActionFunctionArgs) {

    try {
        const updates: TaskWithNewUsers = await request.json();
        const { newUsers: _, status: __, ...rest } = updates;
        const userId = auth.currentUser?.uid || '';
        const userName = auth.currentUser?.displayName || '';
        const status = updates.status.map(({ entry }) => ({ datetime: Timestamp.fromDate(new Date()), entry, author: userName || userId }));
        const upload = await uploadDoc({ ...rest, users: updates.newUsers.map(({ id }) => id), status }, collections.tasks);
        console.log(upload);
        return redirect('/tasks')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}