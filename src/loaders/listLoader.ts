import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default async function listLoader() {
    return await downloadDocsV2('lists') || [];
}