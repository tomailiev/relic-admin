import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default function textItemLoader({ params }: LoaderFunctionArgs) {
    return downloadOneDoc('textContent', 'allTexts')
        .then(allTexts => {
            const docId = params.textId;
            if (!docId) {
                return { error: true, severity: 'error', message: 'No ID' };
            }
            
            return allTexts[docId] ?
                {
                    id: docId,
                    key: docId,
                    value: allTexts[docId]
                }
                : null;
        });
}