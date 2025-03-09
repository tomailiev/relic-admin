import { List } from "../types/DB";
import { downloadDocsV2, downloadOneDoc } from "../utils/firebase/firebase-functions";

export default async function listSourceLoader({ source, name, id }: List) {
    console.log(id);

    try {
        if (id) {
            const item: List = await downloadOneDoc('lists', id);
            return item?.source === 'donors'
                ? { data: { members: await downloadDocsV2('donors', [{ type: 'condition', value: ['email', '!=', ''] }]), source: item.source, name } }
                : { data: { members: await downloadDocsV2('subscribers', [{ type: 'condition', value: ['status', '==', 1] }]), source: item.source, name } }
        }
        return source === 'donors'
            ? { data: { members: await downloadDocsV2('donors', [{ type: 'condition', value: ['email', '!=', ''] }]), source, name } }
            : { data: { members: await downloadDocsV2('subscribers', [{ type: 'condition', value: ['status', '==', 1] }]), source, name } }
    } catch (e) {
        return e instanceof Error
            ? [{ name: 'Error', link: e.message, id: e.message, error: true }]
            : [{ name: 'Error', id: 'no idea', error: true }];
    }
}