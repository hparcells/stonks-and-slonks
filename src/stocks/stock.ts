/**
 * @fileoverview This file creates stocks that can simulate trends.
 * @author Nathan Alex
 */
import clamp from '../utils/clamp';

/** The configuration of the stock. */
export interface StockSettings {
  /** The settings controlling the price simulation. */
  price: StockSettingsPrice;
  /** How many entries the history can hold. */
  historyMax: number;
  /** The settings controlling the trend simulation. */
  trend: StockSettingsTrend;
  /** How many stocks are available to buy. */
  availableStocks: number;
  /** The abbreviation for the stock. */
  stockSymbol: string;
}
/** The settings controlling the price simulation. */
export interface StockSettingsPrice {
  /** price.maxChange The maximum value that the price can change by. (0-Infinity) */
  maxChange: number;
  /** price.minChange The minimum value that the price can change by. (0-Infinity) */
  minChange: number;
  /** price.value The price of the stock. (0-∞) */
  value: number;
}
/** The settings controlling the price simulation. */
export interface StockSettingsTrend {
  /** The maximum value that the trend can change by. (0-99) */
  maxChange: number;
  /** The minimum value that the trend can change by. (0-99) */
  minChange: number;
  /** The value of the trend. (0-99) */
  value: number;
}

/** Class representing a stock. */
export class Stock {
  history: number[];
  historyMax: number;
  name: string;
  price: StockSettingsPrice;
  trend: StockSettingsTrend;
  availableStocks: number;
  stockSymbol: string;

  /**
   * Creates a stock that changes value every time a simulation is run.
   * @param name The visual name of the stock.
   * @param settings The configuration of the stock.
   */
  constructor(name: string, settings: StockSettings) {
    this.history = [settings.price.value];
    this.historyMax = settings.historyMax;
    this.name = name;
    this.price = settings.price;
    this.trend = settings.trend;
    this.availableStocks = settings.availableStocks;
    this.stockSymbol = settings.stockSymbol;
  }

  /** Runs through a simulation of the stock. */
  simulate() {
    // The deciding factors of price and trend changes.
    const priceChange = Math.floor(Math.random() * Math.floor(this.price.maxChange) + 1) + Math.floor(this.price.minChange);
    const trendChange = Math.floor(Math.random() * Math.floor(this.trend.maxChange) + 1) + Math.floor(this.trend.minChange);

    // The deciding factors of price and trend differentials.
    const priceDiffie = Math.floor(Math.random() * 100);
    const trendDiffie = Math.floor(Math.random() * 2);

    // Calculate whether the price is going up or down.
    if (priceDiffie >= 0 && priceDiffie <= this.trend.value) {
      // Increase the price of the stock.
      this.price.value += priceChange;
    } else {
      // Decrease the price of the stock.
      this.price.value -= priceChange;
      this.price.value = clamp(this.price.value, 0);
    }

    // Calculate whether the trend is going up or down.
    if (trendDiffie === 0) {
      // Increase the trend.
      this.trend.value += trendChange;
      this.trend.value = clamp(this.trend.value, 0, 99);
    } else {
      // Decrease the trend.
      this.trend.value -= trendChange;
      this.trend.value = clamp(this.trend.value, 0, 99);
    }

    // Make sure the stock history does not get too long.
    if (this.history.length >= this.historyMax) {
      this.history.splice(this.history.length - 1, 1);
    }

    // Push the new stock to the history.
    this.history.push(this.price.value);

    // Returns the current price of the stock.
    return this.price.value;
  }
}
