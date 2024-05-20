import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function templateEditLoader({ params }) {
    return downloadOneDoc(collections.templates, params.templateId)
        .then((template) => {
            return {
                campaign: template
            }
            // .map(([key, value]) => `${key} (${value})`)
        });
}