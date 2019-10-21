// Stonks and Slonks UI: Main File
// It is currently a test file.
import * as logic from '../logic';
import state from '../logic/state';
import { simulateDay, TIMESCALE_MAP } from '../logic';

// ???
logic.startGame();

setInterval(() => {
  // If we are not paused...
  if(!state.paused) {
    // Simulate a day.
    simulateDay();
  }
}, TIMESCALE_MAP[state.timescale]);
