import { redirect } from "react-router-dom";
import { Timestamp, uploadDoc } from "../../utils/firebase/firebase-functions";
import { eventSchema } from "../../utils/yup/yup-schemas";

const schematify = (prev, [key, value]) => {
    if (key.startsWith('performances')) {
        const startChar = key.indexOf('[');
        const endChar = key.indexOf(']');
        const index = key.substring(startChar + 1, endChar);
        const updatedKey = key.substring(endChar + 2);
        if (!prev.performances[index]) {
            prev.performances[index] = {};
        }
        prev.performances[index][updatedKey] = value;
        return prev;
    }
    prev[key] = value;
    return prev;
}

export default function eventAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const entries = Object.fromEntries(doc);
            const schema = Object.entries(entries).reduce(schematify, { performances: [] });
            return eventSchema.validate(schema, { abortEarly: false })
        })
        .then(val => {
            const update = {
                ...val,
                dateDone: Timestamp.fromDate(val.dateDone)
            };
            return uploadDoc(update, 'mock-events');
        })
        .then(doc => {
            console.log(doc);
            return redirect('/')
        })
        .catch(e => {
            if (e.inner) {
                const errors = e.inner.reduce((p, c) => {
                    return { ...p, [c.path]: c.message, errorType: 'Validation error' };
                }, {});
                console.log(errors);
                return errors
            }
            console.error(e)
            return e;
        })
}