// Stonks and Slonks Logic: Stonk Handler
// This file contains all the functions for handing the buying and selling of Stonks.

import { Stock } from "../../stocks";

import state from "../state";
import { removeMoney } from "./money-handler";

/** Buys a Stonk. */
export function buyStonk(stonk: Stock) {
  // Add the Stonk to the player's owned stonks.
  state.player.ownedStonks.push({
    stonk: stonk,
    boughtPrice: stonk.stockPrice
  });

  // Removes the money from the player's money.
  removeMoney(stonk.stockPrice);

  // TODO: Remove from Stonk Market.
}

/** Sells a Stonk. */
export function sellStonk(stonk: Stock) {
  // TODO:
  throw new Error('Not implemented.');
}
