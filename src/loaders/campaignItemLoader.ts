import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function campaignItemLoader({ params }: LoaderFunctionArgs) {
    return downloadOneDoc(collections.campaigns, params.campaignId)
}