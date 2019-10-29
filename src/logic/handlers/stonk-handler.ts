// Stonks and Slonks Logic: Stonk Handler
// This file contains all the functions for handing the buying and selling of Stonks.
import { removeAt } from '@reverse/array';

import { Stock } from '../../stocks';

import { state } from '../state';
import { removeMoney, addMoney } from './money-handler';

/**
 * Buts a Stonk from the Stonk Market.
 * @param stonk The Stonk to buy.
 * @param quantity The number of Stonks to buy.
 * @param forceBuy Whether or not the bypass the closed Stonk check.
 */
export function buyStonk(stonk: Stock, quantity: number = 1, forceBuy: boolean = false) {
  // If we do not have enough money.
  if(state.player.money < stonk.price * quantity) {
    throw new Error('Player does not have enough money.');
  }
  // If we try and buy a negative amount of Stonks.
  if(quantity < 0) {
    throw new Error('Cannot buy a negative number of Stonks.');
  }
  // If we try and buy more Stonks than there are available.
  if(stonk.availableStocks < quantity) {
    throw new Error('The Stonk Market does not have enough of that Stonk.');
  }
  // Check if the Stonk is closed or not.
  if(stonk.isClosed && !forceBuy) {
    throw new Error('The requested Stonk is closed and is unable to be bought.');
  }

  // Add the Stonk to the player's owned stonks.
  if(state.player.ownedStonks.map((ownedStonk) => {
    return ownedStonk.name;
  }).includes(stonk.name)) {
    const stonkIndex = state.player.ownedStonks.map((ownedStonk) => {
      return ownedStonk.name;
    }).indexOf(stonk.name);

    state.player.ownedStonks[stonkIndex].count += quantity;
  }else {
    state.player.ownedStonks.push({
      name: stonk.name,
      symbol: stonk.symbol,
      count: quantity
    });
  }

  // Removes the money from the player's money.
  removeMoney(stonk.price);

  // Remove from Stonk Market.
  stonk.availableStocks--;
}

/**
 * Sells Stonks.
 * @param stonk The Stonk to sell.
 * @param quantity The amound of Stonks to sell.
 */
export function sellStonk(stonk: Stock, quantity: number = 1) {
  // If we try to sell a negative number of Stonks.
  if(quantity < 0) {
    throw new Error('Cannot sell a negative number of Stonks.');
  }

  const stonkIndex = state.player.ownedStonks.map((ownedStonk) => {
    return ownedStonk.name;
  }).indexOf(stonk.name);

  // If we try to sell more Stonks than the player actually has.
  if(state.player.ownedStonks[stonkIndex].count < quantity) {
    throw new Error('Cannot sell more Stonks than the player actually has.');
  }

  // Add money gained or lost.
  const marketStonk = state.market.getStockById(stonk.id);

  if(!marketStonk) {
    throw new Error('The Stonk does not exist in the market. This should not happen.');
  }
  addMoney(marketStonk.price * quantity);

  // Add to Stonk market.
  state.market.stocks[state.market.stocks.map((marketStonk) => {
    return marketStonk.name;
  }).indexOf(stonk.name)].availableStocks -= quantity;

  // Remove from player's owned stonks.
  if(state.player.ownedStonks[stonkIndex].count > quantity) {
    state.player.ownedStonks[stonkIndex].count -= quantity;

    return;
  }
  state.player.ownedStonks = removeAt(state.player.ownedStonks, stonkIndex);
}
