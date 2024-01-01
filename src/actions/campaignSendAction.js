import { redirect } from "react-router-dom";
import { sendCampaign } from "../utils/firebase/firebase-functions";

export default async function campaignSendAction({ request, params }) {
    return request.json()
        .then(res => {
            return sendCampaign(res);
        })
        .then(doc => {
            console.log(doc);
            return redirect('/campaigns');
        })
        .catch(e => {
            return e;
        })
}