// Stonks and Slonks Logic: Game Handler
// This file contains all the functions for the game to start and retrival of data.
import { randomInt } from '@reverse/random';
import { capitalize } from '@reverse/string';
import buzzphrase from 'buzzphrase';

import { Market } from '../../stocks/market';
import { Stock } from '../../stocks';

import { state, setState } from '../state';

/** Starts the game. */
export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: []
    },
    market: new Market(),
    day: 0,
    startTime: Date.now()
  });

  // Generate four stock markets.
  for(let i = 0; i < 4; i++) {
    const name = buzzphrase.get().split(' ').map((word) => {
      return word.split('-').map((subword) => {
        return capitalize(subword);
      }).join('-');
    }).join(' ');

    state.market.addStock(new Stock({
      name,
      symbol: name.split(' ').map((word) => {
        return word.split('')[0];
      }).join(''),
      historyMax: 200,
      price: {
        value: randomInt(500, 1000) / 100,
        minChange: randomInt(50, 200) / 100,
        maxChange: randomInt(200, 300) / 100
      },
      trend: {
        value: randomInt(0, 99),
        minChange: randomInt(35, 49),
        maxChange: randomInt(50, 65)
      }
    }));
  }
}

/** Gets the main info. */
export function getGameInfo() {
  return state;
}
/** Simulates one day unit of time. Should be called every 10 seconds. */
export function simulateDay() {
  state.day++;

  state.market.simulate();

  // TODO: Random event check.
}
