// Stonks and Slonks Logic: Time Handler
// This file contains all the functions for managing time.

import state from "../state";

export type Timescale = 'normal' | 'fast' | 'fastest';

export const TIMESCALE_MAP = {
  normal: 10000,
  fast: 5000,
  fastest: 1000
}

/** Pauses or unpauses the game. */
export function togglePause() {
  state.paused = !state.paused;
}

/**
 * Sets the timescale of the game.
 * @param timescale How fast.
 */
export function setTimescale(timescale: Timescale) {
  state.timescale = timescale;
}

/** Returns a date including day, month, date, and year. */
export function getFormattedDate() {
  return new Date(state.startTime + (86400000 * state.day)).toDateString();
}
