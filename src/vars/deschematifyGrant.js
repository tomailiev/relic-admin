import { deschematify } from "./schemaFunctions";

export default function deschematifyGrant(item) {
    const dueMonths = item.dueMonths.map(m => ({ month: m }));
    return deschematify({...item, dueMonths}, 'dueMonths');
}