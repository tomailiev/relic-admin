import { downloadDocs } from "../../utils/firebase/firebase-functions";

export default async function videoLoader() {
    return await downloadDocs('videos', ['featured', '!=', 0], ['featured', 'desc']);
}