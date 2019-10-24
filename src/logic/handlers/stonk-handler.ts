// Stonks and Slonks Logic: Stonk Handler
// This file contains all the functions for handing the buying and selling of Stonks.

import { Stock } from '../../stocks';

import { state } from '../state';
import { removeMoney } from './money-handler';

/** Buys a Stonk. */
export function buyStonk(stonk: Stock) {
  // Add the Stonk to the player's owned stonks.
  state.player.ownedStonks.push({
    stonk,
    boughtPrice: stonk.price
  });

  // Removes the money from the player's money.
  removeMoney(stonk.price);

  // TODO: Remove from Stonk Market.
}

/** Sells a Stonk. */
export function sellStonk(stonk: Stock) {
  throw new Error('Not implemented.');

  // TODO: Remove player's money.
  // TODO: Add to stonk market.
}
