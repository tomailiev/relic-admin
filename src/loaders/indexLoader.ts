import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import { auth } from "../utils/firebase/firebase-init";
import { currentMonth, getMonthRange, } from "../vars/dateObjects";

export default async function indexLoader({ request }: LoaderFunctionArgs) {
    const uid = auth.currentUser?.uid;
    if (!uid) return { tasks: [], logs: [] };

    const url = new URL(request.url);
    const month = url.searchParams.get('month') ?? currentMonth;

    const { start, end } = getMonthRange(month);

    try {
        const [tasks, logs] = await Promise.all([
            downloadDocsV2('tasks', [{ type: 'condition', value: ['archived', '!=', 1] }, { type: 'condition', value: ['users', 'array-contains', uid] }]),
            downloadDocsV2('logs', [{ type: 'condition', value: ['userId', '==', uid] }, { type: 'condition', value: ['date', '>=', start] }, { type: 'condition', value: ['date', '<=', end] }])
        ]);

        return { tasks: tasks || [], logs: logs || [] }

    } catch (error) {
        console.log(error);
        return { tasks: [], logs: [] };

    }
}