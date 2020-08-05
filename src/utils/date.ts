export function countDaysBetween(earlier: Date, later: Date): number {
  const timeBetween = later.valueOf() - earlier.valueOf();
  return Math.ceil(timeBetween / ONE_DAY);
}

const ONE_DAY = 24 * 60 * 60 * 1000;

export function getReadableDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

const MONTHS = [
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

export default {
  countDaysBetween,
  getReadableDate,
};
