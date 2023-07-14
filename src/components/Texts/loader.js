import { downloadOneDoc } from "../../utils/firebase/firebase-functions";

export default function textLoader() {
    return downloadOneDoc('textContent', 'allTexts')
        .then(allTexts => {
            return Object.entries(allTexts)
                .sort(([a,], [b,]) => a.localeCompare(b))
                .reduce((acc, curr) => {
                    acc.push({
                        title: curr[0],
                        value: curr[1],
                        id: curr[0]
                    });
                    return acc;
                }, []);
        });
}