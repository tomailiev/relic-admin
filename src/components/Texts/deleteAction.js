import { redirect } from "react-router-dom";
import { deleteOneField } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textDeleteAction({ _, params }) {
    const field = params.textId;
    return deleteOneField(collections.texts, 'allTexts', field)
        .then(() => redirect('/texts'))
        .catch(e => console.log(e));
}