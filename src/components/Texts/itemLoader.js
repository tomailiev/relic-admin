import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default function textItemLoader({ params }) {
    return downloadOneDoc('textContent', 'allTexts')
        .then(allTexts => {
            return allTexts[params.textId];
        });
}