import { getFileList } from "../utils/firebase/firebase-functions";

export default function csvLoader() {
    return getFileList('CSVs')
        .then(res => {
            return res.items.map((itemRef, i) => {
                return { id: itemRef.name, name: itemRef.name }
            });
        });
}

