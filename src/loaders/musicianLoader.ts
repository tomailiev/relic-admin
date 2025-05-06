import { downloadDocsV2, getLink } from "../utils/firebase/firebase-functions";

export default function musicianLoader() {
    return downloadDocsV2('musicians')
        .then(items => {
            if (!items) {
                return Promise.resolve(null);
            }
            const modifiedItems = items.map((item) => {
                return getLink(item.pic)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}