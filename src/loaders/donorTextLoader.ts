import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default function donorTextLoader({ params }: LoaderFunctionArgs) {
    return downloadOneDoc('textContent', 'secureTexts')
        .then(({ donorEmailHtmlContent, donorEmailSubject }) => {
            return {
                content: donorEmailHtmlContent,
                subject: donorEmailSubject,
            };
        });
}