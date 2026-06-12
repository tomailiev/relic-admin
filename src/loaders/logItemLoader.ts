import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function logItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.logId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }

    const item = await downloadOneDoc('logs', docId);
    const tasks = await downloadDocsV2('tasks');

    const newTasks = item.tasks?.length
        ? item.tasks
        : null;
    return newTasks
        ? { ...item, tasks, newTasks, source: 'tasks' }
        : { ...item, tasks, source: 'tasks' };
}