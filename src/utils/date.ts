import type { Sprint } from 'types';

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

export function isSprintActive(sprint: Sprint): boolean {
  const endDate = new Date(sprint.endDate);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(24);
  const today = new Date();
  return endDate > today;
}

export default {
  countDaysBetween,
  getReadableDate,
  isSprintActive,
};
