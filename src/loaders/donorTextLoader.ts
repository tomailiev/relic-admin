import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function donorTextLoader({ params }: LoaderFunctionArgs) {
    return downloadOneDoc(collections.texts, 'secureTexts')
        .then(({ donorEmailContent, donorEmailSubject }) => {
            return {
                content: donorEmailContent,
                subject: donorEmailSubject,
            };
        });
}