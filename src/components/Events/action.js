import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import { eventSchema } from "../../utils/yup/yup-schemas";
import collections from "../../vars/collections";

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];

const schematify = (prev, [key, value]) => {
    if (key.startsWith('performances')) {
        const startChar = key.indexOf('[');
        const endChar = key.indexOf(']');
        const index = key.substring(startChar + 1, endChar);
        const updatedKey = key.substring(endChar + 2);
        if (!prev.performances[index]) {
            prev.performances[index] = {};
        }
        if (updatedKey === 'date') {
            const day = daysOfWeek[new Date(value).getDay()];
            prev.performances[index].day = day;
        }
        prev.performances[index][updatedKey] = value;
        return prev;
    }
    prev[key] = value;
    return prev;
}

export default async function eventAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        const schema = Object.entries(updates).reduce(schematify, { performances: [] });
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
        const update = {
            ...updates,
            dateDone: Timestamp.fromDate(updates.dateDone)
        };
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