import { Timestamp } from "firebase/firestore";
import { months, daysOfWeek } from "./dateObjects";
import { DeEvent, Event } from "../types/DB";


function schematifyEvent(event: DeEvent): Event {
    
    const performances = event.performances.map((p) => {
        const fullDate = new Date(p.date);
        const day = daysOfWeek[fullDate.getUTCDay()];
        const month = months[fullDate.getUTCMonth()];
        const date = fullDate.getUTCDate();
        const [hours, minutes] = p.time.split(':');
        const timeSuffix = Number(hours) > 11 ? 'pm' : 'am';
        const time = `${hours === '12' ? 12 : Number(hours) % 12}:${minutes}${timeSuffix}`;
        const geocode = { lng: Number(p.lng), lat: Number(p.lat) };
        let rest = (({ lng, lat, date, time, ...object }) => object)(p);
        return Object.assign(rest, { time, geocode, day, date: `${month} ${date}, ${fullDate.getFullYear()}` });
    });
    const { imgSrc: _, programBook: __, ...updatedEvent } = event;
    return {
        ...updatedEvent,
        performances,
        dateDone: Timestamp.fromDate(new Date(event.dateDone))
    };
}

export default schematifyEvent;