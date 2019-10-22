'use strict';

var repl = require('repl');

// Stonks and Slonks Logic: Main File
// This file contains all the functions and data that the UI can access
/** Starts the game. */
function startGame() {
    throw new Error('Can\'t start game since no game exists.');
}
/** Gets the main info. */
function getGameInfo() {
    throw new Error('Can\'t get game info since no game exists.');
}
/** Simulates one ??? unit of time. Should be called every 10 seconds. */
function simulateGame() {
    throw new Error('Can\'t simulate the game since no game exists.');
}
// ... add more game actions

var logic = /*#__PURE__*/Object.freeze({
  __proto__: null,
  startGame: startGame,
  getGameInfo: getGameInfo,
  simulateGame: simulateGame
});

// Message
console.clear();
console.log('Inside of this program, you can mess around with the game logic stored in ./logic. All of the exports from ./logic/index.ts are available as globals in this Node.JS REPL.');
console.log();
console.log(logic);
console.log();

// Create a REPL instance.
const instance = repl.start('> ');

// Copy every key from the logic export to the REPL's global object.
Object.keys(logic).forEach((key) => {
  instance.context[key] = logic[key];
});

instance.context.logic = logic;
