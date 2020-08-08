import type { Sprint } from 'types';

export function countDaysLeftInSprint(sprint: Sprint): number {
  const endDate = parseEndDate(sprint);
  const now = new Date();
  const timeBetween = endDate.valueOf() - now.valueOf();
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
  const endDate = parseEndDate(sprint);
  const today = new Date();
  return endDate > today;
}

export function parseEndDate(sprint: Sprint): Date {
  const endDate = new Date(sprint.endDate);
  endDate.setDate(endDate.getDate() + 1);
  endDate.setHours(24);
  return endDate;
}

export default {
  countDaysLeftInSprint,
  getReadableDate,
  isSprintActive,
  parseEndDate,
};
