import type { Sprint } from 'types';
import padWithZero from 'utils/padWithZero';

export function countDaysLeftInSprint(sprint: Sprint): number {
  const endDate = parseEndDate(sprint);
  const now = new Date();
  const timeBetween = endDate.valueOf() - now.valueOf();
  return Math.ceil(timeBetween / ONE_DAY);
}

const ONE_DAY = 24 * 60 * 60 * 1000;

export function getNextSaturday(): string {
  const nextSaturday = new Date(TODAY);
  const daysUntilSaturday = 6 - nextSaturday.getDay();
  nextSaturday.setDate(nextSaturday.getDate() + daysUntilSaturday);
  return stringifyDate(nextSaturday);
}

export function getReadableDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

export function getWeekStructure(year: number, month: number): number[][] {
  const result: number[][] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  result.push([]);
  let week = 0;
  for (let day = 1 - firstDay.getDay(); day <= lastDay.getDate(); day += 1) {
    if (result[week].length === 7) {
      result.push([]);
      week += 1;
    }
    result[week].push(day);
  }
  while (result[week].length < 7) result[week].push(-10);
  return result;
}

export function isSprintActive(sprint: Sprint): boolean {
  const endDate = parseEndDate(sprint);
  const today = new Date();
  return endDate > today;
}

export const MONTHS = [
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

export function parseEndDate(sprint: Sprint): Date {
  const endDate = new Date(sprint.endDate);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(24);
  return endDate;
}

export const stringifyDate = (date: Date): string => {
  return `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;
}

export const TODAY = new Date();

export const TODAY_READABLE = stringifyDate(TODAY);

export default {
  countDaysLeftInSprint,
  getNextSaturday,
  getReadableDate,
  getWeekStructure,
  isSprintActive,
  MONTHS,
  parseEndDate,
  TODAY,
  TODAY_READABLE,
};
