import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function csvItemLoader({ params }: LoaderFunctionArgs) {
    try {
        const docs = await downloadDocsV2(collections.csv, [{ value: ['imported', '==', `CSVs/${params.CSVId}`], type: 'condition' }])
        return { docs, id: params.CSVId };
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}