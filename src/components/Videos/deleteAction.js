import { redirect } from "react-router-dom";
import { deleteOneDoc } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function videoDeleteAction({ _, params }) {
    const docId = params.videoId;
    return deleteOneDoc(collections.videos, docId)
        .then(() => redirect('/videos'))
        .catch(e => console.log(e));
}