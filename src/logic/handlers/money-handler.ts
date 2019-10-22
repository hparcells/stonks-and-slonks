// Stonks and Slonks Logic: Money Handler
// This file contains all the functions to handle the player's money.

import state from "../state";

/**
 * Adds to the amount of money the player has.
 * @param amount The amount of money to add.
 */
export function addMoney(amount: number) {
  state.player.money = state.player.money + amount;
}

/**
 * Removed money from the player.
 * @param amount The amount of money to remove.
 */
export function removeMoney(amount: number) {
  state.player.money = state.player.money - amount;
}

/**
 * Sets the player's money to a given amount.
 * @param amount The amount of money.
 */
export function setMoney(amount: number) {
  state.player.money = amount;
}
