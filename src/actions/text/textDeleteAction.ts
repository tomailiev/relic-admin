import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteOneField } from "../../utils/firebase/firebase-functions";
import collections from "../../vars/collections";

export default async function textDeleteAction({ params }: ActionFunctionArgs) {
    const field = params.textId;
    if (!field) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    return deleteOneField(collections.texts, 'allTexts', field)
        .then(() => redirect('/texts'))
        .catch(e => Object.assign(e, { error: true, severity: 'error' }));
}