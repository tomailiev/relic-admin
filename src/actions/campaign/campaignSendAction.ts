import { ActionFunctionArgs } from "react-router-dom";
import { sendCampaign } from "../../utils/firebase/firebase-functions";

export default async function campaignSendAction({ request }: ActionFunctionArgs) {
    return request.json()
        .then(res => {
            return sendCampaign(res);
        })
        .then(doc => {
            console.log(doc);
            return { severity: 'success', message: 'Campaign sent successfully.' };
        })
        .catch(e => {
            return { severity: 'error', message: e.message };
        })
}