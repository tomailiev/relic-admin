import { redirect } from "react-router-dom";
import collections from "../../vars/collections";
import { deleteDocs, deleteFile } from "../../utils/firebase/firebase-functions";

export default function CSVDeleteAction({ _, params }) {
    const docId = params.CSVId;
    return Promise.all([deleteDocs(collections.csv, ['imported', '==', `CSVs/${docId}`]), deleteFile(`CSVs/${docId}`)])
        .then(() => redirect('/CSVs'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}