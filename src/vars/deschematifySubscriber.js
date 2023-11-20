import { deschematify } from "./schemaFunctions";

export default function deschematifySubscriber(item) {
    const tags = item.tags.map(m => ({ tag: m }));
    return deschematify({...item, tags}, 'tags');
}