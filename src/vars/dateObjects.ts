export const months = [
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
];

export const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const oneYearAgoFromToday = new Date();
oneYearAgoFromToday.setFullYear(oneYearAgoFromToday.getFullYear() - 1);

export const oneYearAgoFromTomorrow = new Date(tomorrow);
oneYearAgoFromTomorrow.setFullYear(oneYearAgoFromTomorrow.getFullYear() - 1);

export const twoYearsAgoFromToday = new Date();
twoYearsAgoFromToday.setFullYear(twoYearsAgoFromToday.getFullYear() - 2);
//todo
export const twoYearsAgoFromTomorrow = new Date(tomorrow);
twoYearsAgoFromTomorrow.setFullYear(twoYearsAgoFromToday.getFullYear() - 2);

export const oneYearAgoFromTomorrowDateString = oneYearAgoFromTomorrow.toISOString().substring(0, 10);
export const todayDateString = today.toISOString().substring(0, 10);
