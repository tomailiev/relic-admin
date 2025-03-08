import { LoaderFunctionArgs } from "react-router-dom";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";
import { List } from "../types/DB";

export default async function listItemLoader({ params }: LoaderFunctionArgs) {
    const docId = params.listId
    if (!docId) {
        return { error: true, severity: 'error', message: 'No ID' };
    }
    const item: List = await downloadOneDoc('lists', docId);
    const members = await downloadDocsV2(item.source === 'donors' ? 'donors' : 'subscribers', [{ type: 'condition', value: ['lists', 'array-contains', params.listId] }]) || []
    
    return { ...item, newMembers: members };
}