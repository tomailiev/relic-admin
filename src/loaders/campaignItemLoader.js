import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignItemLoader({ params }) {
    return downloadOneDoc(collections.campaigns, params.campaignId)
}