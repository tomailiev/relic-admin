import { schematify } from "./schemaFunctions";

export default function schematifyGrant(item) {
    const withMonths = schematify(item, 'dueMonths');
    const dueMonths = withMonths.dueMonths.map(({ month }) => Number(month));
    const notification = Number(item.notification);
    return { ...withMonths, dueMonths, notification };
};