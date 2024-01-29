import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import { subscriberSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import { schematify } from "../vars/schemaFunctions";
import schematifySubscriber from "../vars/schematifySubscriber";



export default async function subscriberAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        const schema = schematify(updates, 'tags');
        try {
            console.log(schema);
            return await subscriberSchema.validate(schema, { abortEarly: false });
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
        const subAddition = {
            opt_in_time: new Date().toISOString(),
            import: 'admin',
            id: updates.email.toLowerCase()
        }
        const upload = await uploadDoc(Object.assign((schematifySubscriber(updates, 'tags')), subAddition), collections.subscribers, updates.email.toLowerCase(), true);
        console.log(upload);
        return redirect('/subscribers')
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