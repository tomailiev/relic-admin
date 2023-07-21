import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import { eventSchema } from "../../utils/yup/yup-schemas";
import collections from "../../vars/collections";
import { schematify } from "../../vars/schemaFunctions";

// const daysOfWeek = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday'
// ];


export default async function eventAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        const schema = schematify(updates, 'performances');
        try {
            return await eventSchema.validate(schema, { abortEarly: false });
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
        const update = schematify({
            ...updates,
            dateDone: Timestamp.fromDate(new Date(updates.dateDone))
        }, 'performances');
        const upload = await uploadDoc(update, collections.events);
        console.log(upload);
        return redirect('/events')
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