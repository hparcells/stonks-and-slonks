import { state } from '../logic/state';

/** Returns a date including day, month, date, and year. */
export function getFormattedDate(): string {
  return new Date(state.startTime + (86400000 * state.day)).toDateString();
}

export function isWeekday(date: string): boolean {
  return date.includes('Mon') || date.includes('Tue') || date.includes('Wed') || date.includes('Thu') || date.includes('Fri');
}
