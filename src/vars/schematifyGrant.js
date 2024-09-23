import months from "./months";

export default function schematifyGrant(item) {
    console.log(item);
    const dueMonths = item.dueMonths.map(({ dueMonth }) => months.findIndex(str => str === dueMonth));
    const notification = item.notification === 'No' ? 0 : 1;
    return { ...item, dueMonths, notification };
};