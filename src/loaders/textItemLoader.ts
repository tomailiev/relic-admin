import { LoaderFunctionArgs } from "react-router-dom";
import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function textItemLoader({ params }:LoaderFunctionArgs) {
    return downloadOneDoc('texts', 'allTexts')
        .then(allTexts => {
            return allTexts[params.textId] ?
                {
                    id: params.textId,
                    key: params.textId,
                    value: allTexts[params.textId]
                }
                : null;
        });
}