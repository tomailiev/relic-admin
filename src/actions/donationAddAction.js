import { redirect } from "react-router-dom";
import { uploadDoc } from "../utils/firebase/firebase-functions";
import { donationSchema, donorSchema } from "../utils/yup/yup-schemas";
import collections from "../vars/collections";
import { getTruthy } from "../vars/schemaFunctions";
import { arrayUnion } from "firebase/firestore";
import normalizePhoneNumber from "../vars/normalizePhoneNumber";



export default async function donationAddAction({ request, params }) {
    const doc = await request.formData();
    const updates = Object.fromEntries(doc);
    if (doc.get('intent') === 'preflight') {
        if (doc.has('email')) {
            try {
                return await donorSchema.validate(updates, { abortEarly: false });
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
            return await donationSchema.validate(updates, { abortEarly: false });
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
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            location,
            objectID,
            amount,
            campaign,
            comment,
            date,
            recognitionName
        } = updates;
        await uploadDoc(getTruthy({
            firstName,
            lastName,
            email: email.toLowerCase(),
            phone: normalizePhoneNumber(phone),
            address,
            location,
            lastDonationAmount: Number(amount),
            lastDonationDate: date,
            donations: arrayUnion(getTruthy({ amount: Number(amount), date, recognitionName: recognitionName || `${firstName} ${lastName}`, campaign, comment }))
        }), collections.donors, objectID, true);
        return redirect('/donors');
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