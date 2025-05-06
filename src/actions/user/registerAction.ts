import { registerUser } from "../../utils/firebase/firebase-functions";
import { ActionFunctionArgs } from "react-router-dom";

export default function registerAction({ request, params }: ActionFunctionArgs) {
    return request.json()
        .then(({ email, password }) => {
            return registerUser({ email, password })
        })
        .then(({ data }) => {
            console.log(data);
            return { result: 'Success' }
        })
        .catch(e => {
            return e;
        })
}