import { LoaderFunction } from "react-router-dom";
import { downloadDocsV2 } from "../utils/firebase/firebase-functions";

const donorLoader: LoaderFunction = () => {
    return downloadDocsV2('donors')
        .catch(e => {
            return [{ firstName: 'Error', lastName: e.code, recognitionName: e.message, id: e.code, error: true }];
        })
};

export default donorLoader;