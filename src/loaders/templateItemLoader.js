import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function templateItemLoader({ params }) {
    console.log(params.templateId);
    return downloadOneDoc(collections.templates, params.templateId)
}