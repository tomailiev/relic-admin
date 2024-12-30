import { months } from "./dateObjects";
import { deschematify } from "./schemaFunctions";

export default function deschematifyGrant(item) {
    const dueMonths = item.dueMonths.sort((a, b) => a - b).map(m => ({ dueMonth: months[m] }));
    
    const notification = item.notification === 0 ? 'No' : 'Yes';
    return deschematify({ ...item, dueMonths, notification });
}