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

export const now = Date.now();

export const today = new Date();

export const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;


// yyyy-mm-dd for today
export const todayStr = today.toISOString().slice(0, 10);

// yyyy-mm-01 for the first day of the month
export const firstOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;

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

export function getLast12Months() {
  const months = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString("default", { month: "long", year: "numeric" });

    months.push({ value, label });
  }

  return months;
}

export function getEndOfMonth(year: number, month: number) {
  // month is 1–12, but JS Date expects 0–11
  const end = new Date(year, month, 0); // day 0 = last day of previous month
  return end.toISOString().slice(0, 10); // yyyy-mm-dd
}

export function getMonthRange(monthStr: string) {
  const [year, month] = monthStr.split("-").map(Number);

  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = getEndOfMonth(year, month);

  return { start, end };
}

