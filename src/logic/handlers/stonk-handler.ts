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
  if(state.player.money < stonk.price.value) {
    throw new Error('Player does not have enough money.');
  }

  // Add the Stonk to the player's owned stonks.
  state.player.ownedStonks.push(stonk);

  // Removes the money from the player's money.
  removeMoney(stonk.price.value);

  // Remove from Stonk Market.
  const index = state.stonkMarket.indexOf(stonk);

  // If the Stonk Market does not have enough Stonks.
  if(state.stonkMarket[index].availableStocks < 1) {
    return;
  }
  state.stonkMarket[index].availableStocks--;
}

/**
 * Sells a single Stonk.
 * @param stonk The Stonk to sell.
 */
function sellStonk(stonk: Stock) {
  const stonkMarketIndex = state.stonkMarket.findIndex((stonkMarketStonk) => {
    return stonkMarketStonk.name === stonk.name;
  });
  addMoney(state.stonkMarket[stonkMarketIndex].price.value - stonk.price.value);

  // Add to stonk market.
  state.stonkMarket[stonkMarketIndex].availableStocks++;

  // Remove from player's owned stonks.
  const stonkIndex = state.player.ownedStonks.indexOf(stonk);
  if(state.player.ownedStonks[stonkIndex].availableStocks > 1) {
    state.player.ownedStonks[stonkIndex].availableStocks--;

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
