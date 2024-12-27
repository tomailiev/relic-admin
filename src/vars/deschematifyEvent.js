
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
    'December'
]

function deschematifyEvent(item) {
    const dateObject = item.dateDone.toDate();
    const month = dateObject.getMonth() >= 9 ? dateObject.getMonth() + 1 : `0${dateObject.getMonth() + 1}`;
    const dateDone = `${dateObject.getUTCFullYear()}-${month}-${dateObject.getUTCDate()}`;

    const performances = item.performances.map((p => {
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
        let rest = (({ day, date, time, geocode, ...object }) => object)(p);
        if (p.geocode) {
            rest.lng = p.geocode.lng;
            rest.lat = p.geocode.lat;
        }
        return Object.assign(rest, { time, date: completeDate, });
    }));

    return { ...item, performances, dateDone };
}

export default deschematifyEvent;