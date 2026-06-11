import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import { auth } from "../utils/firebase/firebase-init";

export default async function indexLoader() {
    const uid = auth.currentUser?.uid;
    if (!uid) return { tasks: [], logs: [] };

    try {
        const [tasks, logs] = await Promise.all([
            downloadDocsV2('tasks', [{ type: 'condition', value: ['users', 'array-contains', uid] }]),
            downloadDocsV2('logs', [{ type: 'condition', value: ['userId', '==', uid] }])
        ]);

        return { tasks: tasks || [], logs: logs || [] }

    } catch (error) {
        console.log(error);
        return { tasks: [], logs: [] };

    }
}