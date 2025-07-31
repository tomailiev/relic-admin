import { DeEvent, DePerformance, Event, Performance } from "../types/DB";
import { months } from "./dateObjects";


export function deschematifyPerformance(p: Performance): DePerformance {

    const [month, date, year] = p.date.split(' ');

    const index = months.findIndex(m => m === month);
    const modifiedMonth = index >= 9 ? index + 1 : `0${index + 1}`;
    const dateString = date.replace(/\D/g, '');
    const modifiedDate = dateString.length > 1 ? dateString : `0${dateString}`;
    const completeDate = `${year}-${modifiedMonth}-${modifiedDate}`;
    let [hours, mins_meridiem] = p.time.split(':');
    const mins = mins_meridiem.substring(0, 2);
    const meridiem = mins_meridiem.substring(2);
    if (meridiem === 'pm' && hours !== '12') {
        hours = (Number(hours) + 12).toString();
    }
    const time = hours.length > 1 ? `${hours}:${mins}` : `0${hours}:${mins}`;
    let rest = (({ date, time, geocode, ...object }) => object)(p) as DePerformance;
    if (p.geocode) {
        rest.lng = p.geocode.lng;
        rest.lat = p.geocode.lat;
    }
    return Object.assign(rest, { time, date: completeDate, });
}

export function deschematifyEvent(item: Event): DeEvent {
    const dateObject = item.dateDone.toDate();
    const dateDoneMonth = dateObject.getMonth() >= 9 ? dateObject.getMonth() + 1 : `0${dateObject.getMonth() + 1}`;
    const dateDoneDate = dateObject.getUTCDate();
    const dateDone = `${dateObject.getUTCFullYear()}-${dateDoneMonth}-${dateDoneDate > 9 ? dateDoneDate : '0' + dateDoneDate}`;

    const performances: DePerformance[] = item.performances.map(deschematifyPerformance);

    return { ...item, performances, dateDone, banner: item.banner || '', program: item.program || '' };
}

