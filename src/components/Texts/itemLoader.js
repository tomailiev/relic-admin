import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default function textItemLoader({ params }) {
    return downloadOneDoc('mock-text', 'allTexts')
        .then(allTexts => {
            return {
                id: params.textId,
                key: params.textId,
                value: allTexts[params.textId]
            };
        });
}