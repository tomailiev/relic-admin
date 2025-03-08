import { LoaderFunction } from "react-router-dom";
import { getFileList } from "../utils/firebase/firebase-functions";

 const csvLoader: LoaderFunction = () => {
    return getFileList('CSVs')
        .then(res => {
            return res.items.map((itemRef, i) => {
                return { id: itemRef.name, name: itemRef.name }
            });
        });
};

export default csvLoader;

