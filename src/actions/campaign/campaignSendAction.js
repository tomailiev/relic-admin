import { sendCampaign } from "../../utils/firebase/firebase-functions";

export default async function campaignSendAction({ request, params }) {
    return request.json()
        .then(res => {
            return sendCampaign(res);
        })
        .then(doc => {
            console.log(doc);
            return { severity: 'success', 'message': 'Campaign sent successfully.' };
        })
        .catch(e => {
            return { severity: 'error', message: e };
        })
}