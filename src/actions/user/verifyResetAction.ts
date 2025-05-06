import { verifyOrReset } from "../../utils/firebase/firebase-functions";
import { ActionFunctionArgs } from "react-router-dom";

export default async function verifyResetAction({ request, params }: ActionFunctionArgs) {
    try {
        const { email, reason } = await request.json();
        const { data } = await verifyOrReset({ email, reason }) as { data: { code: string } };
        if (data.code === 'Success') {
            return { result: 'Email sent!' }
        } else {
            return { result: 'Possible error!' }
        }
    } catch (e) {
        console.log(e);
        return e;
    }
}