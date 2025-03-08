import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listItemLoader({ params }: LoaderFunctionArgs) {
    const item = await downloadOneDoc(collections.lists, params.listId);
    const members = await downloadDocsV2(collections[item.source], [{ type: 'condition', value: ['lists', 'array-contains', params.listId] }]) || []
    
    return { ...item, newMembers: members };
}