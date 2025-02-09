import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listItemLoader({ params }) {
    const item = await downloadOneDoc(collections.lists, params.listId);
    const members = await downloadDocsV2(collections[item.source], [{type: 'condition', value: ['email', 'in', item.members]}])
    return { ...item, newMembers: members };
}