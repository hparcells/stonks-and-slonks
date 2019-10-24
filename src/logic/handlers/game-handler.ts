// Stonks and Slonks Logic: Game Handler
// This file contains all the functions for the game to start and retrival of data.
import { randomInt } from '@reverse/random';
import { capitalize } from '@reverse/string';
import buzzphrase from 'buzzphrase';

import { Market } from '../../stocks/market';
import { Stock } from '../../stocks';
import { isWeekday, getFormattedDate } from '../../utils/date-util';

import { state, setState } from '../state';

/** Starts the game. */
export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: [],
      minimumWage: 5
    },
    market: new Market(),
    day: 0,
    startTime: Date.now()
  });

  // Generate four stock markets.
  for(let i = 0; i < 4; i++) {
<<<<<<< HEAD
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
    state.stonkMarket.push(new Stock(name, {
      historyMax: 100,
      price: {
        value: Number((Math.random() * (10 - 5) + 5).toFixed(2)),
        maxChange: Infinity,
        minChange: Infinity
      },
      trend: {
        value: randomInt(5, 35),
        maxChange: randomInt(5, 35),
        minChange: randomInt(5, 35)
      },
      availableStocks: randomInt(100, 250),
      stockSymbol: name.split(' ').map((word) => {
        return word.split('')[0];
      }).join('')
=======
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
>>>>>>> master
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

<<<<<<< HEAD
  // Simulate all the Stonks,
  for(const stonk of state.stonkMarket) {
    stonk.simulate();
  }
=======
  state.market.simulate();
>>>>>>> master

  // Add minimum wage to player's money if it is a weekday.
  if(isWeekday(getFormattedDate())) {
    state.player.money += state.player.minimumWage;
  }

  // TODO: Random event check.
}
