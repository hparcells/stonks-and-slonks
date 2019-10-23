// Stonks and Slonks Logic: Game Handler
// This file contains all the functions for the game to start and retrival of data.
import { randomInt } from '@reverse/random';
import { capitalize } from '@reverse/string';
import buzzphrase from 'buzzphrase';

import { state, setState } from '../state';
import { Stock } from '../../stocks';
import { isWeekday, getFormattedDate } from '../../utils/date-util';

/** Starts the game. */
export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: [],
      minimumWage: 5
    },
    stonkMarket: [],
    day: 0,
    startTime: Date.now()
  });

  // Generate four stock markets.
  for(let i = 0; i < 4; i++) {
    function generateName() {
      return buzzphrase.get().split(' ').map((word) => {
        return word.split('-').map((subword) => {
          return capitalize(subword);
        }).join('-');
      }).join(' ');
    }

    // Check if the name already exists.
    const existingNames = state.stonkMarket.map((stonk) => {
      return stonk.name;
    });

    let name;
    do {
      name = generateName();
    }while(existingNames.includes(name));

    // Add the stock to the Stonk Market.
    state.stonkMarket.push(new Stock({
      name,
      stockSymbol: name.split(' ').map((word) => {
        return word.split('')[0];
      }).join(''),
      margin: randomInt(10, 100),
      availableStocks: randomInt(100, 250),
      stockPrice: Number((Math.random() * (10 - 5) + 5).toFixed(2)),
      instability: randomInt(5, 35)
    }));
  }
}

/** Gets the main info. */
export function getGameInfo() {
  return state;
}
/** Simulates one day unit of time. Should be called every 10 seconds. */
export function simulateDay() {
  // Increase the day count.
  state.day++;

  // Simulate all the Stonks,
  for(const stonk of state.stonkMarket) {
    stonk.simulate();
  }

  // Add minimum wage to player's money if it is a weekday.
  if(isWeekday(getFormattedDate())) {
    state.player.money += state.player.minimumWage;
  }

  // TODO: Random event check.
}
