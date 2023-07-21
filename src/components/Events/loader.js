import { downloadDocs, getLink } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

// , ['dateDone', '>', new Date(1970)], ['dateDone', 'desc']

export default function eventLoader() {
    return downloadDocs(collections.events)
        .then(items => {
            const modifiedItems = items.map((item) => {
                return getLink(item.imageUrl)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}