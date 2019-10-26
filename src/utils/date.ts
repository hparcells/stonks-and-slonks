import { state } from '../logic/state';

/** Returns a date including day, month, date, and year. */
export function getFormattedDate(): string {
  return new Date(state.startTime + (86400000 * state.day)).toDateString();
}

/**
 * Checks if a given date is a weekday.
 * @param date The date in .toDateString() format.abs
 */
export function isWeekday(date: string): boolean {
  return date.includes('Mon') || date.includes('Tue') || date.includes('Wed') || date.includes('Thu') || date.includes('Fri');
}

/**
 * Checks if the given date is the last day of the month.
 * @param date The date to check.
 */
export function isLastDay(date: Date) {
  return new Date(date.getTime() + 86400000).getDate() === 1;
}
