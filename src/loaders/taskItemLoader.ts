import { LoaderFunctionArgs } from "react-router-dom";
import { Task } from "../types/DB";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function taskItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.taskId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const item: Task = await downloadOneDoc('tasks', docId);
    const users = await downloadDocsV2('users', [{ type: 'condition', value: ['lists', 'array-contains', params.taskId] }]) || []

    return { ...item, newUsers: users };
}