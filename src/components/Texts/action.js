import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";

export default function textAction({ request, params }) {
    return request.formData()
        .then(doc => {
            const updates = Object.fromEntries(doc);
            return uploadDoc(updates, 'textContent', 'new-doc')
        })
        .then(doc => {
            console.log(doc);
            return redirect('/')
        });
    // uploadDoc('textContent', 'new-doc')
    //     .then(doc => console.log(doc.id));
}