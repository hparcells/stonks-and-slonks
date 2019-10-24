// Stonks and Slonks Logic: Stonk Handler
// This file contains all the functions for handing the buying and selling of Stonks.
import { removeAt } from '@reverse/array';

import { Stock } from '../../stocks';

import { state } from '../state';
import { removeMoney, addMoney } from './money-handler';

/**
 * Buts a Stonk from the Stonk Market.
 * @param stonk The Stonk to buy.
 */
export function buyStonk(stonk: Stock) {
  // If we do not have enough money.
  if(state.player.money < stonk.price) {
    throw new Error('Player does not have enough money.');
  }

  // Add the Stonk to the player's owned stonks.
  state.player.ownedStonks.push(stonk);

  // Removes the money from the player's money.
  removeMoney(stonk.price);

  // Remove from Stonk Market.
  // If the Stonk Market does not have enough Stonks.
  if(stonk.availableStocks < 1) {
    throw new Error('Stonk Market does not have enough of this Stonk.');
  }
  stonk.availableStocks--;
}

/**
 * Sells a single Stonk.
 * @param stonk The Stonk to sell.
 */
function sellStonk(stonk: Stock) {
  // Add money gained or lost.
  const marketStonk = state.market.getStockById(stonk.id);

  if(!marketStonk) {
    throw new Error('The Stonk does not exist in the market. This shouldn\'t happen.');
  }
  addMoney(marketStonk.price - stonk.price);

  // Add to stonk market.
  state.market.addStock(stonk);

  // Remove from player's owned stonks.
  const stonkIndex = state.player.ownedStonks.indexOf(stonk);
  if(state.player.ownedStonks[stonkIndex].availableStocks > 1) {
    state.player.ownedStonks.push(stonk);

    // Removes the money from the player's money.
    removeMoney(stonk.price);

    return;
  }
  state.player.ownedStonks = removeAt(state.player.ownedStonks, stonkIndex);
}

/**
 * Sells Stonks.
 * @param stonk The Stonk to sell.
 * @param quantity The amound of Stonks to sell.
 */
export function sellStonks(stonk: Stock, quantity: number) {
  if(quantity < 0) {
    throw new Error('Cannot sell a negative number of Stonks.');
  }

  for(let i = 0; i < quantity; i++) {
    sellStonk(stonk);
  }
}
