// import { redirect } from "react-router-dom";
import { downloadDocs, uploadFile } from "../utils/firebase/firebase-functions";
import { CSVSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";

export default async function CSVAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            const validated = await CSVSchema.validate(updates, { abortEarly: false });
            const upload = await uploadFile(updates.csv, `CSVs/${updates.csv.name}`)
            console.log(upload);
            return validated;
        } catch (e) {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            console.error(e)
            return Object.assign(e, { error: true, severity: 'error' });
        }
    } 
    try {
        const docs = await downloadDocs(collections.csv, ['import', '!=', updates.fileName])
        console.log(docs);
        return docs;
    } catch (e) {
        console.error(e)
        return Object.assign(e, { error: true, severity: 'error' });
    }
}