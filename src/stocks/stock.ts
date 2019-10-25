/**
 * @fileoverview This file creates stocks that can simulate trends.
 * @author Nathan Alex (Original Author) and Dave Caruso
 */
import clamp from '../utils/clamp';
import uuid from 'uuid/v4';

/** The configuration of the stock. */
export interface StockSettings {
  /** The visual name of the stock. */
  name: string;
  /** The abbreviated symbol of the stock. */
  symbol: string;
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
  /** A UUID Assigned to the stock. */
  public id: string = uuid();
  public symbol: string;
  public history: number[];
  public historyMax: number;
  public name: string;
  public isClosed: boolean;
  public availableStocks: number;

  private priceData: StockSettingsPrice;
  private trendData: StockSettingsTrend;

  /**
   * Creates a stock that changes value every time a simulation is run.
   * @param settings The configuration of the stock.
   */
  constructor(settings: StockSettings) {
    this.history = [settings.price.value];
    this.historyMax = settings.historyMax;
    this.name = settings.name;
    this.priceData = settings.price;
    this.trendData = settings.trend;
    this.symbol = settings.symbol;
    this.isClosed = false;
    this.availableStocks = settings.availableStocks;
  }

  /** Runs through a simulation of the stock. */
  simulate() {
    // The deciding factors of price and trend changes.
    const priceChange = (
      Math.floor(Math.random() * Math.floor(this.priceData.maxChange * 100) + 1) + Math.floor(this.priceData.minChange * 100)
    ) / 100;
    const trendChange = Math.floor(Math.random() * Math.floor(this.trendData.maxChange) + 1) + Math.floor(this.trendData.minChange);

    // The deciding factors of price and trend differentials.
    const priceDiffie = Math.floor(Math.random() * 100);
    const trendDiffie = Math.floor(Math.random() * 2);

    // Calculate whether the price is going up or down.
    if (priceDiffie >= 0 && priceDiffie <= this.trendData.value) {
      // Increase the price of the stock.
      this.priceData.value += priceChange;
    } else {
      // Decrease the price of the stock.
      this.priceData.value -= priceChange;
      this.priceData.value = clamp(this.priceData.value, 0);
    }

    // Calculate whether the trend is going up or down.
    if (trendDiffie === 0) {
      // Increase the trend.
      this.trendData.value += trendChange;
      this.trendData.value = clamp(this.trendData.value, 0, 99);
    } else {
      // Decrease the trend.
      this.trendData.value -= trendChange;
      this.trendData.value = clamp(this.trendData.value, 0, 99);
    }

    // Make sure the stock history does not get too long.
    if (this.history.length >= this.historyMax) {
      this.history.splice(this.history.length - 1, 1);
    }

    // Push the new stock to the history.
    this.history.push(this.priceData.value);

    // Returns the current price of the stock.
    return this.priceData.value;
  }

  /** Closes the stock */
  close() {
    this.isClosed = true;
  }
  /** Opens the stock */
  open() {
    this.isClosed = false;
  }
  toggleClose() {
    this.isClosed = !this.isClosed;
  }

  get price() {
    return this.priceData.value;
  }
  get trend() {
    return this.trendData.value;
  }
}
