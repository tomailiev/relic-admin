import { downloadDocs, getLink } from "../../utils/firebase/firebase-functions";

// const date = new Date();
// const month = date.getMonth();
// const seasonSwitch = month >= 7;
// const season = seasonSwitch ? date.getFullYear() - 2021 : date.getFullYear() - 2022;
// , ['featured', '==', season], ['name']

export default function musicianLoader() {
    return downloadDocs('mock-musicians')
        .then(items => {
            const modifiedItems = items.map((item) => {
                return getLink(item.pic)
                    .then(imgSrc => Object.assign(item, { imgSrc }))
            });

            return Promise.all(modifiedItems);
        })
    // .then(modifiedItesm)
}