import { Stock } from './stock';

/** A grouping of stocks. */
export class Market {
  /** The Stocks the market has. */
  public stocks: Stock[] = [];

  public constructor() {}

  addStock(stock: Stock) {
    this.stocks.push(stock);
  }
  /** Removes a stock. Provide the stock object itself or  */
  removeStock(stock: Stock | string) {
    const theStock = typeof stock === 'string' ? this.getStockById(stock) : stock;
    if(theStock) {
      this.stocks = this.stocks.filter((s) => s !== theStock);
    }
  }

  getStockById(id: string) {
    return this.stocks.find(stock => stock.id === id);
  }

  simulate() {
    this.stocks.forEach((stock) => stock.simulate());
  }
}
