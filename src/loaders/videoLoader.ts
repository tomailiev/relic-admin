import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default async function videoLoader() {
    return await downloadDocsV2('videos', [{ value: ['featured', 'desc'], type: 'sorting' }]);
}