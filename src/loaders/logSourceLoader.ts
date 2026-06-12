import logProps from "../props/logProps";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default async function logSourceLoader() {
    const tasks = await downloadDocsV2('tasks');
    
    return { ...logProps.fields, tasks };
}