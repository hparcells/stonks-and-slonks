import { state } from '../logic';

/** Returns a date including day, month, date, and year. */
export function getFormattedDate() {
  return new Date(state.startTime + (86400000 * state.day)).toDateString();
}