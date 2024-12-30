import { downloadDocsV2, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default function musicianLoader() {
    return downloadDocsV2(collections.musicians)
        .then(items => {
            const modifiedItems = items.map((item) => {
                return getLink(item.pic)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}