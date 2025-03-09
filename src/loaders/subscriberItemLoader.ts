import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import deschematifySubscriber from "../vars/deschematifySubscriber";

export default async function subscriberItemLoader({ params }: LoaderFunctionArgs) {
    return await downloadOneDoc('subscribers', params.subscriberId)
        .then(item => {
            return item ? deschematifySubscriber(item) : null;
        })
        .catch(e => console.log(e))

}