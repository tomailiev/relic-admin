import { registerUser } from "../../utils/firebase/firebase-functions";
import { ActionFunctionArgs } from "react-router-dom";

export default function registerAction({ request, params }: ActionFunctionArgs) {
    return request.json()
        .then(({ email, password, displayName }) => {
            return registerUser({ email, password, displayName })
        })
        .then(({ data }) => {
            console.log(data);
            return { result: 'Success' }
        })
        .catch(e => {
            return e;
        })
}