import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";
import { LogWithNewTasks } from "../../types/itemProps";



export default async function logEditAction({ request }: ActionFunctionArgs) {
    const doc: LogWithNewTasks = await request.json();

    try {
        const { id: _, newTasks: __, source: ___, ...rest } = doc;
        await uploadDoc({ ...rest, tasks: doc.newTasks.map(({ id, name }) => ({ id, name })) }, collections.logs, doc.id, true);
        return redirect(`/logs`);
    } catch (e) {
        console.error(e)
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}