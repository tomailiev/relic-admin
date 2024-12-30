import { Timestamp } from "firebase/firestore";
import { months, daysOfWeek } from "./dateObjects";


function schematifyEvent(event) {
    
    const performances = event.performances.map((p) => {
        const fullDate = new Date(p.date);
        const day = daysOfWeek[fullDate.getUTCDay()];
        const month = months[fullDate.getUTCMonth()];
        const date = fullDate.getUTCDate();
        const [hours, minutes] = p.time.split(':');
        const timeSuffix = hours > 11 ? 'pm' : 'am';
        const time = `${hours === '12' ? 12 : hours % 12}:${minutes}${timeSuffix}`;
        const geocode = { lng: Number(p.lng), lat: Number(p.lat) };
        let rest = (({ lng, lat, date, time, ...object }) => object)(p);
        return Object.assign(rest, { time, geocode, day, date: `${month} ${date}, ${fullDate.getFullYear()}` });
    });
    const { imgSrc: _, ...updatedEvent } = event;
    return {
        ...updatedEvent,
        performances,
        dateDone: Timestamp.fromDate(new Date(event.dateDone))
    };
}

export default schematifyEvent;