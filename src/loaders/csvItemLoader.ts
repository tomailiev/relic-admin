import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function csvItemLoader({ params }: LoaderFunctionArgs) {
    try {
        const docs = await downloadDocsV2('CSVs', [{ value: ['imported', '==', `CSVs/${params.CSVId}`], type: 'condition' }])
        return { docs, id: params.CSVId };
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };    }
}