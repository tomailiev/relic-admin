import { schematify } from "./schemaFunctions";

const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

function schematifyEvent(event) {
    const withPerformances = schematify(event, 'performances');
    const performances = withPerformances.performances.map((p) => {
        const fullDate = new Date(p.date);
        const day = daysOfWeek[fullDate.getUTCDay()];
        const month = months[fullDate.getUTCMonth()];
        const date = fullDate.getUTCDate();
        const dateSuffix = date === 1
            ? 'st'
            : date === 2
                ? 'nd'
                : date === 3
                    ? 'rd'
                    : 'th';
        const [hours, minutes] = p.time.split(':');
        const timeSuffix = hours > 11 ? 'pm' : 'am';
        const time = `${hours === '12' ? 12 : hours % 12}:${minutes}${timeSuffix}`;
        const geocode = { lng: Number(p.lng), lat: Number(p.lat) };
        let rest = (({ lng, lat, date, time, ...object }) => object)(p);
        return Object.assign(rest, { time, geocode, day, date: `${month} ${date}${dateSuffix}, ${fullDate.getFullYear()}` });
    });
    return { ...withPerformances, performances };
}

export default schematifyEvent;