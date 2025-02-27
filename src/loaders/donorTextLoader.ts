import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function donorTextLoader({ params }) {
    return downloadOneDoc(collections.texts, 'secureTexts')
        .then(({ donorEmailContent, donorEmailSubject }) => {
            return {
                content: donorEmailContent,
                subject: donorEmailSubject,
            };
        });
}