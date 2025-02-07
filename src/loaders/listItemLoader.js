import { downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listItemLoader({ params }) {
    const item = await downloadOneDoc(collections.lists, params.listId);
    return { ...item, newMembers: item.members };
}