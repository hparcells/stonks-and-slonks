/**
 * @fileoverview This file creates stocks that can simulate trends.
 * @author Nathan Alex
 */
import { Stock } from "./stock";

/** Class representing an account. */
export class Account {
  /**
   * The balance of the account.
   */
  balance: number;
  /**
   * An object containing all of the stocks owned by the account.
   */
  stocks: { [id: string]: number };

  /**
   * Creates an account that can own stocks.
   * @param balance The starting balance of the account.
   */
  constructor(balance = 0) {
    this.balance = balance;
    this.stocks = {};
  }

  /**
   * Purchases a specified quantity of stock.
   * @param stock The class containing the stock being purchased.
   * @param amount The quantity of this stock to purchase.
   * @returns Whether the function could purchase the stock or not.
   */
  purchaseStock(stock: Stock, amount: number) {
    // Checks if the account has enough money.
    if (this.balance >= stock.price.value) {
      // Makes sure the account has the stock registered.
      if (typeof this.stocks[stock.name] !== 'number') {
        this.stocks[stock.name] = 0;
      }

      // Purchases the stock.
      this.balance -= stock.price.value * amount;
      this.stocks[stock.name] += amount;

      // The stock was successfully purchased.
      return true;
    } else {
      // The account's balance does not have enough.
      return false;
    }
  }

  /**
   * Sells a specified quantity of stock.
   * @param stock The class containing the stock being sold.
   * @param amount The quantity of this stock to sell.
   * @returns Whether the function could sell the stock or not.
   */
  sellStock(stock: Stock, amount: number): boolean {
    // Makes sure the account has the stock registered.
    if (typeof this.stocks[stock.name] !== 'number') {
      return false;
    }

    // Checks if the account has enough stocks purchased.
    if (this.stocks[stock.name] >= amount) {
      // Makes sure the account has the stock registered.
      if (typeof this.stocks[stock.name] !== 'number') {
        this.stocks[stock.name] = 0;
      }

      // Sells the stock.
      this.stocks[stock.name] -= amount;
      this.balance += stock.price.value * amount;

      // The stock was successfully sold.
      return true;
    } else {
      // The account does not have enough of the stock.
      return false;
    }
  }
}
