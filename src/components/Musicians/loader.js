import { downloadDocs, getLink } from "../../utils/firebase/firebase-functions";

export default function musicianLoader() {
    return downloadDocs('musicians', ['featured', '==', true], ['name'])
        .then(items => {
            const modifiedItems = items.map((item) => {
                return getLink(item.pic)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}