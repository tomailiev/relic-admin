import { redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function musicianAddAction({ request, params }) {

    try {
        const updates = await request.json();
        const { imgSrc: _, ...updatedMusician } = updates;
        const upload = await uploadDoc(updatedMusician, collections.musicians);
        console.log(upload);
        return redirect('/musicians')
    } catch (e) {
        return Object.assign(e, { error: true, severity: 'error' });
    }
}