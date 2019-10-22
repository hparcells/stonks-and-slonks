// Stonks and Slonks Stock Engine
// Written by Nathan Alex
// Typed by Dave Caruso
import uuid from 'uuid/v4';
import { Stock } from './Stock';

/** An account, which can buy and sell stocks. */
export class Account {
  /** Unique Identifier */
  id: string = uuid();
  /** Balance of the account */
  balance: number;
  /** Stocks owned */
  stocks: { [stockId: string]: number } = {};

  constructor(balance: number) {
    this.balance = balance;
  }

  /** Buys a stock. Returns true or false on success or failure. */
  buyStock(stock: Stock, amount: number): boolean {
    if (this.balance >= stock.stockPrice * amount) {
      // Check if the amount of stocks being bought is enough.
      if (amount > 0 && amount <= stock.availableStocks) {
        // There's enough, purchase that many stocks.
        if (typeof this.stocks[stock.id] !== 'number') {
          this.stocks[stock.id] = 0;
        }

        // Increase the amount of this stock by one.
        this.balance -= stock.stockPrice * amount;
        stock.availableStocks -= amount;
        this.stocks[stock.id] += amount;

        // Buy successful.
        return true;
      } else {
        // Not enough stocks, or the amount was <= 0.
        return false;
      }
    } else {
      // The purchase was unsuccessful.
      return false;
    }
  }

   /** Sells a stock. Returns true or false on success or failure. */
  sellStock(stock: Stock, amount: number): boolean {
    if (typeof this.stocks[stock.id] === 'number') {
      // Check if the amount of stocks being sold is enough.
      if (amount > 0 && amount <= this.stocks[stock.id]) {
        // Increase the amount of this stock by one.
        this.balance += stock.stockPrice * amount;
        stock.availableStocks += amount;
        this.stocks[stock.id] -= amount;

        // Sell successful.
        return true;
      } else {
        // Not enough stocks, or the amount was <= 0.
        return false;
      }
    } else {
      // This stock is not owned.
      return false;
    }
  }

  getStock(stock: Stock) {
    return this.stocks[stock.id] || 0;
  }
}
