import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listItemLoader({ params }) {
    return await downloadOneDoc(collections.lists, params.listId);
}