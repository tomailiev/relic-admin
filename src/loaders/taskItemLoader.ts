import { LoaderFunctionArgs } from "react-router-dom";
import { Task } from "../types/DB";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
// import { documentId } from "firebase/firestore";

export default async function taskItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.taskId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const item: Task = await downloadOneDoc('tasks', docId);
    const users = await downloadDocsV2('users');
    const newUsers = item.users?.length
        ? item.users.map((id) => {
            const displayName = users?.find((value) => value.id === id)?.displayName;
            return { displayName, id };
        })
        : null;
    return newUsers
        ? { ...item, users, newUsers, source: 'users' }
        : { ...item, users, source: 'users' };
}