import taskProps from "../props/taskProps";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default async function taskSourceLoader() {
    const users = await downloadDocsV2('users');
    console.log(users);
    
    return { ...taskProps.fields, users };
}