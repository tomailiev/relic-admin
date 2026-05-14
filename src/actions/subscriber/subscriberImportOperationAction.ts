import { ActionFunctionArgs } from "react-router-dom";
import { subscribeEventAttendees } from "../../utils/firebase/firebase-functions";

export default async function subscriberImportOperationAction({ request }: ActionFunctionArgs) {
    return request.json()
        .then(res => {
            return subscribeEventAttendees(res);
        })
        .then(doc => {
            console.log(doc);
            const { code, newCounter, updatedCounter } = doc.data as { code: string, newCounter: number, updatedCounter: number };
            return { severity: code, message: `New contacts: ${newCounter}; Updated contacts: ${updatedCounter}`, error: true };
        })
        .catch(e => {
            return { severity: 'error', message: e.message };
        })
}