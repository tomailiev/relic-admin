import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { auth } from "../../utils/firebase/firebase-init";
import { LogWithNewTasks } from "../../types/itemProps";



export default async function logAddAction({ request, params }: ActionFunctionArgs) {
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get('redirectTo');

    try {
        const updates: LogWithNewTasks = await request.json();
        const { newTasks: _, source: __, ...rest } = updates;
        const userId = auth.currentUser?.uid || '';
        const upload = await uploadDoc({ ...rest, userId, tasks: updates.newTasks.map(({ name, id }) => ({ name, id })) }, collections.logs);
        console.log(upload);
        return redirect(redirectTo ?? '/logs')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };

    }
}