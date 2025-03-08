import { ListItemProps } from "../types/itemProps";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";
import collections from "../vars/collections";

export default async function listSourceLoader({ source, name, id }: ListItemProps['item']) {
    console.log(id);

    try {
        if (id) {
            const item = await downloadOneDoc(collections.lists, id);
            return item?.source === 'donors'
                ? { data: { members: await downloadDocsV2(collections.donors, [{ type: 'condition', value: ['email', '!=', ''] }]), source: item.source, name } }
                : { data: { members: await downloadDocsV2(collections.subscribers, [{ type: 'condition', value: ['status', '==', 1] }]), source: item.source, name } }
        }
        return source === 'donors'
            ? { data: { members: await downloadDocsV2(collections.donors, [{ type: 'condition', value: ['email', '!=', ''] }]), source, name } }
            : { data: { members: await downloadDocsV2(collections.subscribers, [{ type: 'condition', value: ['status', '==', 1] }]), source, name } }
    } catch (e) {
        return [{ name: 'Error', link: e.code, id: e.code, error: true }];
    }
}