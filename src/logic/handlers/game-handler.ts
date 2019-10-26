// Stonks and Slonks Logic: Game Handler
// This file contains all the functions for the game to start and retrival of data.
import { randomInt } from '@reverse/random';
import { capitalize } from '@reverse/string';
import { removeAt } from '@reverse/array';
import buzzphrase from 'buzzphrase';

import { Market } from '../../stocks/market';
import { Stock } from '../../stocks';
import { isWeekday, getFormattedDate, isLastDay } from '../../utils/date';

import { state, setState } from '../state';

export function addNewStonk() {
  // Generate a name.
  let name;

  // Keep generating names until we get a unique one.
  do {
    name = buzzphrase.get().split(' ').map((word) => {
      return word.split('-').map((subword) => {
        return capitalize(subword);
      }).join('-');
    }).join(' ');
  }while(state.market.stocks.map((stonk) => {
    return stonk.name;
  }).includes(name));

  // Add the Stonk to the Stonk Market.
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
    },
    availableStocks: randomInt(100, 250),
    stockSymbol: name.split(' ').map((word) => {
      return word.split('')[0];
    }).join('')
  }));
}

/** Starts the game. */
export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: [],
      income: [{ name: 'Job', amount: 5, occurrence: 'daily', endIn: -1 }],
      // TODO: Add bills here.
      expenses: []
    },
    market: new Market(),
    day: 0,
    startTime: Date.now(),
    addNewStonkDay: randomInt(60, 90)
  });

  // Generate four stock markets.
  for(let i = 0; i < 4; i++) {
    addNewStonk();
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

  // Simulate the market.
  state.market.simulate();

  // Add minimum wage to player's money if it is a weekday.
  if(isWeekday(getFormattedDate())) {
    state.player.money += state.player.income[0].amount;
  }

  // Add a new Stonk if we waited long enough.
  if(state.addNewStonkDay === state.day) {
    addNewStonk();

    // Set the new day.
    state.addNewStonkDay += randomInt(60, 90);
  }

  // Handle income.
  state.player.income.forEach((incomeSource) => {
    if(
      (incomeSource.occurrence === 'daily')
      || (incomeSource.occurrence === 'weekly' && getFormattedDate().includes('Sun'))
      || (incomeSource.occurrence === 'monthly' && isLastDay(new Date(state.startTime + (86400000 * state.day))))
      || (incomeSource.occurrence === 'annually' && getFormattedDate().includes('Dec 31'))
    ) {
      state.player.money += incomeSource.amount;

      if(incomeSource.endIn > 0) {
        incomeSource.endIn--;

        if(incomeSource.endIn === 0) {
          const incomeIndex = state.player.income.indexOf(incomeSource);

          state.player.income = removeAt(state.player.income, incomeIndex);
        }
      }
    }
  });

  // Handle expenses.
  state.player.expenses.forEach((expense) => {
    if(
      (expense.occurrence === 'daily')
      || (expense.occurrence === 'weekly' && getFormattedDate().includes('Sun'))
      || (expense.occurrence === 'monthly' && isLastDay(new Date(state.startTime + (86400000 * state.day))))
      || (expense.occurrence === 'annually' && getFormattedDate().includes('Dec 31'))
    ) {
      state.player.money -= expense.cost;

      if(expense.endIn > 0) {
        expense.endIn--;

        if(expense.endIn === 0) {
          const expenseIndex = state.player.expenses.indexOf(expense);

          state.player.income = removeAt(state.player.income, expenseIndex);
        }
      }
    }
  });

  // TODO: Random event check.
}
