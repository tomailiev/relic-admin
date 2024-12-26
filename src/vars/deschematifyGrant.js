import months from "./months";
import { deschematify } from "./schemaFunctions";

export default function deschematifyGrant(item) {
    const dueMonths = item.dueMonths.map(m => ({ dueMonth: months[m] }));
    const notification = item.notification === 0 ? 'No' : 'Yes';
    return deschematify({ ...item, dueMonths, notification });
}