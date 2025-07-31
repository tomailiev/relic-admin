import { ActionFunctionArgs, redirect } from "react-router-dom";
import { uploadDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function photoAddAction({ request }: ActionFunctionArgs) {

    try {
        const updates = await request.json();
        const { imgSrc: _, ...updatedphoto } = updates;
        const upload = await uploadDoc(updatedphoto, collections.photos);
        console.log(upload);
        return redirect('/photos')
    } catch (e) {
        if (e instanceof Error) {
            return Object.assign({ message: e.message }, { error: true, severity: 'error' });
        }
        return { error: true, severity: 'error', message: 'Unknown error' };
    }
}