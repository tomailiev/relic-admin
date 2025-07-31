import eventProps from "../props/eventProps";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default async function eventSourceLoader() {
    const musicians = await downloadDocsV2('musicians');
    return { ...eventProps.fields, ...eventProps.filesFields, ...eventProps.filesFields, musicians };
}