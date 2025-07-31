import { downloadDocsV2, getLink } from "../utils/firebase/firebase-functions";

export default function photoLoader() {
    return downloadDocsV2('photos')
        .then(items => {
            if (!items) {
                return Promise.resolve(null);
            }
            const modifiedItems = items.map((item) => {
                return getLink(item.path)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}