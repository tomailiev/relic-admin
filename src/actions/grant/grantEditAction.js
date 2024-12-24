import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import { grantSchema } from "../../utils/yup/yup-schemas";
import collections from "../../vars/collections";
import { schematify } from "../../vars/schemaFunctions";
import schematifyGrant from "../../vars/schematifyGrant";



export default async function grantEditAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        const schema = schematify(updates, 'dueMonths');
        try {
            return await grantSchema.validate(schema, { abortEarly: false });
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
        const { id: _, ...rest } = updates;
        const update = schematifyGrant(rest);
        await uploadDoc(update, collections.grants, updates.id, true);
        return redirect(`/grants/${updates.id}`);
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