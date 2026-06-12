import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
// import { auth } from "../utils/firebase/firebase-init";

export default async function logLoader() {
    try {
        const users = await downloadDocsV2('users');
        const logs = await downloadDocsV2('logs');
        return logs?.map(log => ({ ...log, userName: users?.find((user) => user.id === log.userId)?.displayName || '' }))
    } catch (e) {
        console.log(e);

        return [];

    }
}