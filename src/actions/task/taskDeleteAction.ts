import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function taskDeleteAction({ params }: ActionFunctionArgs) {
    const docId = params.taskId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneDoc(collections.tasks, docId)
        .then(() => redirect('/tasks'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}