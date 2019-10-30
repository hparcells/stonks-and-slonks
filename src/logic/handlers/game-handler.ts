// Stonks and Slonks Logic: Game Handler
// This file contains all the functions for the game to start and retrival of data.
import { randomInt } from '@reverse/random';
import { capitalize } from '@reverse/string';
import { removeAt } from '@reverse/array';
import buzzphrase from 'buzzphrase';

import { checkRandomEvent } from './random-event-hander';
import { state, setState } from '../state';
import { Stock, StockSettingsPrice, StockSettingsTrend } from '../../stocks';
import { Market } from '../../stocks/market';

import { isWeekday, getFormattedDate, isLastDay } from '../../utils/date';

type StonkPreset = 'starter';

const STONK_PRESETS: { [Preset in StonkPreset]: StonkGenerationSettings } = {
  starter: {
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
    availableStocks: randomInt(100, 250)
  }
};

export interface StonkGenerationSettings {
  /** The settings controlling the price simulation. */
  price: StockSettingsPrice;
  /** How many entries the history can hold. */
  historyMax: number;
  /** The settings controlling the trend simulation. */
  trend: StockSettingsTrend;
  /** How many stocks are available to buy. */
  availableStocks: number;
}

/** Adds a new Stonk to the Stonk Market. */
export function addNewStonk(settings: StonkGenerationSettings) {
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

  let symbol = name.split(' ').map((word) => {
    return word.split('')[0];
  }).join('');

  if(state.market.stocks.map((marketStonk) => {
    return marketStonk.symbol;
  }).includes(symbol)) {
    symbol = symbol + '-';

    do {
      symbol = symbol + randomInt(0, 9);
    }while(state.market.stocks.map((marketStonk) => {
      return marketStonk.symbol;
    }).includes(symbol));
  }

  // Add the Stonk to the Stonk Market.
  state.market.addStock(new Stock({
    name,
    symbol,
    historyMax: 200,
    price: settings.price,
    trend: settings.trend,
    availableStocks: settings.availableStocks
  }));
}

/** Starts the game. */
export function startGame() {
  setState({
    player: {
      money: 100,
      ownedStonks: [],
      income: [{ name: 'Job', amount: () => 5, occurrence: 'daily', endIn: -1 }],
      expenses: []
    },
    market: new Market(),
    day: 0,
    startTime: Date.now(),
    addNewStonkDay: randomInt(60, 90),
    incomeTax: 0.1,
    randomEvent: undefined as any
  });

  // Add bills.
  state.player.expenses.push(
    {
      name: 'Utility: Electricity',
      cost: () => 100,
      occurrence: 'monthly',
      endIn: -1
    },
    {
      name: 'Utility: Gas',
      cost: () => 100,
      occurrence: 'monthly',
      endIn: -1
    },
    {
      name: 'Utility: Internet',
      cost: () => 60,
      occurrence: 'monthly',
      endIn: -1
    },
    {
      name: 'Utility: Water',
      cost: () => 70,
      occurrence: 'monthly',
      endIn: -1
    }
  );

  // Add other expenses.
  state.player.expenses.push({
    name: 'Income Tax',
    cost: () => {
      const jobIndex = state.player.income.map((incomeSource) => {
        return incomeSource.name;
      }).indexOf('Job');

      return state.player.income[jobIndex].amount() * state.incomeTax;
    },
    occurrence: 'daily',
    endIn: -1
  });

  // Generate four stock markets.
  for(let i = 0; i < 4; i++) {
    addNewStonk(STONK_PRESETS.starter);
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
    const jobIndex = state.player.income.map((incomeSource) => {
      return incomeSource.name;
    }).indexOf('Job');
    state.player.money += state.player.income[jobIndex].amount();
  }

  // Add a new Stonk if we waited long enough.
  if(state.addNewStonkDay === state.day) {
    addNewStonk(STONK_PRESETS.starter);

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
      state.player.money += incomeSource.amount();

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
      state.player.money -= expense.cost();

      if(expense.endIn > 0) {
        expense.endIn--;

        if(expense.endIn === 0) {
          const expenseIndex = state.player.expenses.indexOf(expense);

          state.player.income = removeAt(state.player.income, expenseIndex);
        }
      }
    }
  });

  // Check if we should trigger a random event.
  checkRandomEvent();
}
