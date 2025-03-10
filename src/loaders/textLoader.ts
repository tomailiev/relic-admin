import { Text } from "../types/DB";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";

export default function textLoader(): Promise<Text[]> {
    return downloadOneDoc('texts', 'allTexts')
        .then(allTexts => {
            return Object.entries(allTexts)
                .filter(([key,]) => key !== 'id')
                .sort(([a,], [b,]) => a.localeCompare(b))
                .reduce((acc: Text[], curr) => {
                    acc.push({
                        title: curr[0],
                        value: curr[1],
                        id: curr[0]
                    });
                    return acc;
                }, []);
        });
}