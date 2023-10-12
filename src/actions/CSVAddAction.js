// import { redirect } from "react-router-dom";
import { uploadFile } from "../utils/firebase/firebase-functions";
import { CSVSchema } from "../utils/yup/yup-schemas";

export default async function CSVAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        try {
            return await CSVSchema.validate(updates, { abortEarly: false });
        } catch (e) {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            console.error(e)
            return Object.assign(e, { errorType: 'Error' });
        }
    }
    try {
        // const upload = await uploadDoc(schematifyGrant(updates, 'dueMonths'), collections.grants);
        const upload = await uploadFile(updates.csv, `CSVs/${updates.csv.name}`)
        console.log(upload);
        return upload;
    } catch (e) {
        if (e.inner) {
            const errors = e.inner.reduce((p, c) => {
                return { ...p, [c.path]: c.message, errorType: 'Validation error' };
            }, {});
            console.log(errors);
            return errors
        }
        return Object.assign(e, { error: true, severity: 'error' });
    }
}