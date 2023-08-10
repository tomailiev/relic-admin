import { emailSchema } from "../utils/yup/yup-schemas";
import { verifyOrReset } from "../utils/firebase/firebase-functions";

export default async function verifyResetAction({ request, params }) {
    try {
        const doc = await request.formData();
        const updates = Object.fromEntries(doc);
        const { email, reason } = await emailSchema.validate(updates, { abortEarly: false });
        const { data } = await verifyOrReset({ email, reason });
        if (data.code === 'Success') {
            return { result: 'Email sent!' }
        }
    } catch (e) {
        if (e.inner) {
            const errors = e.inner.reduce((p, c) => {
                return { ...p, [c.path]: c.message, errorType: 'Validation error' };
            }, {});
            console.log(errors);
            return errors
        }
        console.log(e);
        return Object.assign({ code: e.message }, { errorType: 'Error' });

    }
}