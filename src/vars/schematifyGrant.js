import { months } from "./dateObjects";

export default function schematifyGrant(item) {
    const dueMonths = item.dueMonths.map(({ dueMonth }) => months.findIndex(str => str === dueMonth));
    const notification = item.notification === 'No' ? 0 : 1;
    return { ...item, dueMonths, notification };
};