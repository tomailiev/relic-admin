import { ActionFunctionArgs, redirect } from "react-router-dom";
import { subscribeEventAttendees } from "../../utils/firebase/firebase-functions";

export default async function subscriberImportOperationAction({ request }: ActionFunctionArgs) {
    return request.json()
        .then(res => {
            return subscribeEventAttendees(res);
        })
        .then(doc => {
            console.log(doc);
            return redirect('subscribers');
        })
        .catch(e => {
            return { severity: 'error', message: e.message };
        })
}