import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

export default function campaignAddLoader() {
    return downloadDocsV2('lists')
        .then((items) => {
            return items?.map(({ id, name }) => ({ value: id, display: name })) || [];
            // .map(([key, value]) => `${key} (${value})`)
        });
}