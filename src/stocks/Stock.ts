// Stonks and Slonks Stock Engine
// Written by Nathan Alex
// Typed by Dave Caruso
import uuid from 'uuid/v4';

export interface StockSettings {
  /** The visual name of the stock; */
  name: string;
  /** The maximum amount of money the stock can drop or rise in value; */
  margin: number;
  /** The amount of the stock that is left to be bought. dont set to 0 if you want to buy it; */
  availableStocks: number;
  /** The cost to buy a stock. will take money from an account when bought; */
  stockPrice: number;
  /** Controls the max amount the bias will change. best results with 1-99 */
  instability: number;
}

export class Stock {
  /** Unique Identifier */
  id: string = uuid();
  /** The "trend" part of the stocks. */
  bias = 0;
  /** Controls how much a stock is allowed to change in price. */
  margin: number;
  /** The identifier of the stock. Not necessarily unique. */
  name: string;
  /** The current stock price. */
  stockPrice: number;
  /** The history of all the stock simulations. */
  stockHistory: number[] = [];
  /** Stocks available for purchase. */
  availableStocks: number;
  /** Controls the max amount the bias will change. best results with 1-99 */
  instability: number;

  /** Stock Settings */
  private settings: StockSettings;

  constructor(settings: StockSettings) {
    this.settings = settings;
    this.name = settings.name;
    this.margin = settings.margin;
    this.availableStocks = settings.availableStocks;
    this.stockPrice = settings.stockPrice;
    this.instability = settings.instability;
  }

  /** Simulates one day of a stock. Returns the stock price after the simulation. */
  simulate() {
    /** How much the stock will be changing. */
    const change = Math.floor(Math.random() * this.margin);

    /** How much the bias will be changing. */
    const changeBias = Math.floor(Math.random() * this.settings.instability) + 1;

    /** The deciding factor in whether the stock goes up or down in price. */
    const random = Math.floor(Math.random() * 100);

    /** Whether the "trend" will go up or down. */
    const randomBias = Math.floor(Math.random() * 2);

    // Decides whether the stock will go up or down based on bias.
    if (random >= 0 && random <= this.bias) {
      // The stock is rising.
      this.stockPrice += change;
    } else {
      // The stock is falling.
      this.stockPrice -= change;
    }

    // Decides whether the "trend" goes up or down.
    if (randomBias === 1) {
      // The "trend" is going up.
      this.bias += changeBias;
    } else {
      // The "trend" is going down.
      this.bias -= changeBias;
    }

    // We wouldn't want a negative stock price now would we?
    if (this.stockPrice < 0) { this.stockPrice = 0; }

    // Makes sure the trends do not break the game.
    if (this.bias < 0) { this.bias = 0; }
    if (this.bias > 99) { this.bias = 99; }

    // Make sure the stock history does not get too long.
    if (this.stockHistory.length >= 50) {
      this.stockHistory.splice(this.stockHistory.length - 1, 1);
    }

    // Push the new stock to the history.
    this.stockHistory.push(this.stockPrice);

    // Returns the current price of the stock.
    return this.stockPrice;
  }

  /** Return the difference of the latest stocks */
  difference() {
    if (this.stockHistory.length > 1) {
      const diff0 = this.stockHistory[this.stockHistory.length - 1];
      const diff1 = this.stockHistory[this.stockHistory.length - 2];
      return diff0 - diff1;
    } else {
      // The history is not long enough.
      return 0;
    }
  }

  triggerCrash(biasChange: number, percent: number) {
    this.bias -= biasChange;
    this.stockPrice -= Math.floor(this.stockPrice * (percent / 100));
    if (this.bias < 0) { this.bias = 0; }
  }
  triggerLuck(biasChange: number, percent: number) {
    this.bias += biasChange;
    this.stockPrice += Math.floor(this.stockPrice * (percent / 100));
    if (this.bias > 99) { this.bias = 99; }
  }
}
