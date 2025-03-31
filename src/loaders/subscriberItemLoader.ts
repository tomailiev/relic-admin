import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import deschematifySubscriber from "../vars/deschematifySubscriber";

export default async function subscriberItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.subscriberId;
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return await downloadOneDoc('subscribers', docId)
        .then(item => {
            return item ? deschematifySubscriber(item) : null;
        })
        .catch(e => console.log(e))

}