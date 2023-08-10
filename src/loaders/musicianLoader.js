import { downloadDocs, getLink } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

// const date = new Date();
// const month = date.getMonth();
// const seasonSwitch = month >= 7;
// const season = seasonSwitch ? date.getFullYear() - 2021 : date.getFullYear() - 2022;
// , ['featured', '==', season], ['name']

export default function musicianLoader() {
    return downloadDocs(collections.musicians)
        .then(items => {
            const modifiedItems = items.map((item) => {
                return getLink(item.pic)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}